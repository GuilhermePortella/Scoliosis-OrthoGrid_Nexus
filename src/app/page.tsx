import Link from "next/link";
import { getSortedArticlesData } from "@/lib/articles";

export default function Home() {
  const recentArticles = getSortedArticlesData().slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">NF1 Study Hub</h1>
        <p className="text-lg text-gray-600">
          Informações confiáveis, casos de estudo e uma lista de especialistas em Neurofibromatose Tipo 1.
        </p>
      </header>

      <nav className="grid sm:grid-cols-2 gap-4">
        <Link href="/tecnico" className="rounded-2xl border p-4 hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-medium">Informações Técnicas</h2>
          <p className="text-sm opacity-70">Critérios, protocolos de imagem e referências.</p>
        </Link>
        <Link href="/medicos" className="rounded-2xl border p-4 hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-medium">Encontrar Médicos</h2>
          <p className="text-sm opacity-70">Especialistas e como indicar novos.</p>
        </Link>
        <Link href="/artigos" className="rounded-2xl border p-4 hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-medium">Artigos e Publicações</h2>
          <p className="text-sm opacity-70">Leia os artigos mais recentes sobre NF1.</p>
        </Link>
        <Link href="/estudos_Caso" className="rounded-2xl border p-4 hover:bg-gray-50 transition-colors">
          <h2 className="text-xl font-medium">Estudo de Casos</h2>
          <p className="text-sm opacity-70">Exemplos práticos e discussões de casos.</p>
        </Link>
      </nav>

      <section className="space-y-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold">Artigos Recentes</h2>
          <Link href="/artigos" className="text-sm text-blue-600 hover:underline">Ver todos &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <Link href={`/artigos/${article.id}`} key={article.id} className="block p-5 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  )
}