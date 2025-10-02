export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-semibold">NF1 Study Hub</h1>
      <p className="opacity-80">
        Informações confiáveis, casos de estudo e lista de especialistas em NF1.
      </p>

      <nav className="grid sm:grid-cols-2 gap-4">
        <a href="/tecnico" className="rounded-2xl border p-4 hover:bg-gray-50">
          <h2 className="text-xl font-medium">Informações técnicas</h2>
          <p className="text-sm opacity-70">Critérios, protocolos de imagem e referências.</p>
        </a>
        <a href="/medicos" className="rounded-2xl border p-4 hover:bg-gray-50">
          <h2 className="text-xl font-medium">Médicos</h2>
          <p className="text-sm opacity-70">Especialistas e como indicar novos.</p>
        </a>
        <a href="/indicar-medico" className="rounded-2xl border p-4 hover:bg-gray-50">
          <h2 className="text-xl font-medium">Indicar médico</h2>
          <p className="text-sm opacity-70">Formulário simples (envio para API).</p>
        </a>
        <a href="/estudos_Caso" className="rounded-2xl border p-4 hover:bg-gray-50">
          <h2 className="text-xl font-medium">Diagnósticos e Estudo de Caso</h2>
          <p className="text-sm opacity-70">Exemplos práticos e discussões de casos.</p>
        </a>
      </nav>
    </main>
  )
}