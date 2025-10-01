type Doctor = {
  id: string
  name: string
  crm: string
  specialty: string
  state: string
  city?: string
  verified: boolean
}

const doctors: Doctor[] = [
  { id: '1', name: 'Dr. Exemplo', crm: 'CRM-1234', specialty: 'Ortopedia', state: 'SP', city: 'São Paulo', verified: false },
]

export default function Medicos() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Médicos</h1>
        <a href="/indicar-medico" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Indicar médico</a>
      </header>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((d) => (
          <li key={d.id} className="rounded-2xl border p-4">
            <h2 className="text-lg font-medium">{d.name}</h2>
            <p className="text-sm opacity-80">{d.specialty} • {d.city ? `${d.city}/` : ''}{d.state}</p>
            <p className="text-xs opacity-60">CRM: {d.crm}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}