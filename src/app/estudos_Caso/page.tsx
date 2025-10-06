import Link from 'next/link';
import { caseStudies } from '@/lib/case-studies';

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Estudos de Caso</h1>
      <div className="space-y-6">
        {caseStudies.map((study) => (
          <Link href={`/estudos_Caso/${study.id}`} key={study.id} className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{study.title}</h2>
            <p className="text-gray-600">{study.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}