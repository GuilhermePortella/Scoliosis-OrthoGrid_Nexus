import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// unified/remark/rehype toolchain
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleData {
  id: string;
  title: string;
  summary: string;
  author: string;
  publishedDate: string;
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

  // -------- Sanitize schema ajustado p/ KaTeX --------
  const katexSchema: typeof defaultSchema = structuredClone(defaultSchema);

  // Permitir classes que o KaTeX injeta em <span> e <div>
  katexSchema.attributes = {
    ...katexSchema.attributes,
    span: [
      ...(katexSchema.attributes?.span || []),
      ['className', 'katex'],
      ['className', 'katex-display'],
      ['className', 'katex-html'],
      ['className', 'mord'],
      ['className', 'mspace'],
      ['className', 'mbin'],
      ['className', 'mrel'],
      ['className', 'mop'],
      ['className', 'mord+rule'], // algumas composições comuns
    ],
    div: [
      ...(katexSchema.attributes?.div || []),
      ['className', 'katex'],
      ['className', 'katex-display'],
      ['className', 'katex-html'],
    ],
    // Permitir atributos style mínimos (opcional; normalmente KaTeX não precisa)
    // style pode ser removido se você preferir política mais restritiva
  };

  // -------- Pipeline Markdown -> HTML --------
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)          // tabelas, listas de tarefa, etc.
    .use(remarkBreaks)       // quebra de linha suave
    .use(remarkMath)         // suporte a $...$ e $$...$$
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)          // processar HTML embutido no .md
    .use(rehypeSlug)         // slugs nos headings
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaLabel: 'Link para esta seção' },
      content: { type: 'text', value: '#' },
    })
    .use(rehypeKatex)        // render LaTeX -> HTML/CSS
    .use(rehypeSanitize, katexSchema) // sanitização com KaTeX liberado
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
