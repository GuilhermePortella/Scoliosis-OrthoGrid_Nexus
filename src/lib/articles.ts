import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

  const katexSchema: typeof defaultSchema = structuredClone(defaultSchema);

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
      ['className', 'mord+rule'],
    ],
    div: [
      ...(katexSchema.attributes?.div || []),
      ['className', 'katex'],
      ['className', 'katex-display'],
      ['className', 'katex-html'],
    ],
  };

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaLabel: 'Link para esta seção' },
      content: { type: 'text', value: '#' },
    })
    .use(rehypeKatex)
    .use(rehypeSanitize, katexSchema) 
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