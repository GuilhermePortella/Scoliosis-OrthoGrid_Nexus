import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleData, getAllArticleIds } from '@/lib/articles';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article;
  try {
    article = await getArticleData(params.id);
  } catch (_error) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <article>
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{article.title}</h1>
          <div className="text-md text-gray-500">
            <span>Por {article.author}</span>
            <span className="mx-2">|</span>
            <span>Publicado em {new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <div
          className="prose prose-neutral lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-12 border-t pt-6">
          <Link href="/artigos" className="text-blue-600 hover:underline">
            &larr; Voltar para a lista de artigos
          </Link>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths.map(p => ({ id: p.params.id }));
}