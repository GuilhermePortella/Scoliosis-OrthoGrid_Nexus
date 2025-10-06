import { notFound } from 'next/navigation';
import { getCaseStudyById, caseStudies } from '@/lib/case-studies';
import Link from 'next/link';

// Generate static pages for each case study at build time
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    id: study.id,
  }));
}

export default async function CaseStudyPage({ params }: { params: { id: string } }) {
  // `params` may be a promise in the Next.js app router environment.
  // Await it before accessing properties to avoid the runtime error:
  // "params should be awaited before using its properties"
  const { id } = await params;
  const study = await getCaseStudyById(id);

  if (!study) {
    notFound();
  }

  const StudyComponent = study.component;

  return (
    <>
      {/* Render the case-study component directly so it controls its own layout
          (it already uses mx-auto max-w-4xl p-6). Avoid wrapping it with a
          constrained container that would override its styles. */}
      <StudyComponent />

      {/* Navigation block kept separate and constrained to site width. */}
      <div className="mx-auto max-w-3xl p-6 mt-6 border-t pt-6">
        <Link href="/estudos_Caso" className="text-blue-600 hover:underline">
          &larr; Voltar para todos os casos
        </Link>
      </div>
    </>
  );
}
