import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// unified/remark/rehype toolchain
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleData {
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedDate: string;
  [key: string]: any;
}

export function getSortedArticlesData(): ArticleData[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        ...(matterResult.data as {
          title: string;
          summary: string;
          author: string;
          publishedDate: string;
        }),
      };
    });

  return allArticlesData.sort((a, b) =>
    new Date(a.publishedDate) < new Date(b.publishedDate) ? 1 : -1
  );
}

export async function getArticleData(
  id: string
): Promise<ArticleData & { contentHtml: string }> {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Markdown -> (remark) -> Rehype -> HTML
  // - GFM: tabelas, listas de tarefas, etc.
  // - Breaks: quebra de linha suave para “parágrafos arejados”
  // - Raw: permite HTML do próprio .md (controlado)
  // - Sanitize: camada de segurança (pode ajustar a schema se usar iframes etc.)
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // processa HTML embutido no markdown
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaLabel: 'Link para esta seção' },
      content: {
        type: 'text',
        value: '#',
      },
    })
    .use(rehypeSanitize) // mantenha se o conteúdo vier de autores não confiáveis
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = String(processed);

  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      summary: string;
      author: string;
      publishedDate: string;
    }),
  };
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => ({
      params: { id: fileName.replace(/\.md$/, '') },
    }));
}
