import { notFound } from 'next/navigation';
import { getCaseStudyById, caseStudies } from '@/lib/case-studies';
import Link from 'next/link';

// Generate static pages for each case study at build time
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    id: study.id,
  }));
}

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const study = getCaseStudyById(params.id);

  if (!study) {
    notFound();
  }

  const StudyComponent = study.component;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <article>
        <div
          className="prose prose-neutral lg:prose-xl max-w-none"
        >
           <StudyComponent />
        </div>

        <div className="mt-12 border-t pt-6">
          <Link href="/estudos_Caso" className="text-blue-600 hover:underline">
            &larr; Voltar para todos os casos
          </Link>
        </div>
      </article>
    </main>
  );
}
