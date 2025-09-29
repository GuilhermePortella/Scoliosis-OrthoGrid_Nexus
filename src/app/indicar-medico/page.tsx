'use client'

import { useState } from 'react'

export default function IndicarMedico(){
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    const res = await fetch('/api/doctor-application', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    setStatus(res.ok ? 'ok' : 'err')
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Indicar médico</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Nome completo</label>
          <input name="fullName" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">CRM</label>
            <input name="crm" required className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Especialidade</label>
            <input name="specialty" required className="w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">UF</label>
            <input name="state" required maxLength={2} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Cidade</label>
            <input name="city" className="w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm">E-mail</label>
          <input type="email" name="email" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <button className="rounded-lg border px-4 py-2">Enviar</button>
      </form>
      {status === 'ok' && <p className="text-green-700">Recebido! Obrigado pela indicação.</p>}
      {status === 'err' && <p className="text-red-700">Falha ao enviar. Tente novamente.</p>}
    </main>
  )
}