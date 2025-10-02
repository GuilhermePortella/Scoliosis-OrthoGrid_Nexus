import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/articles';

export default function ArticlesPage() {
  const articles = getSortedArticlesData();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Artigos e Publicações</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link href={`/artigos/${article.id}`} key={article.id} className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-3">{article.summary}</p>
            <div className="text-sm text-gray-500">
              <span>Por {article.author}</span>
              <span className="mx-2">|</span>
              <span>{new Date(article.publishedDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}