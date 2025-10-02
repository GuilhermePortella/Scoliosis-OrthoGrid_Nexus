'use client'

import { useState, useCallback, useRef } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

//reCAPTCHA
function IndicarMedicoForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  console.log('[Debug] executeRecaptcha available:', !!executeRecaptcha);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'loading'>('idle')
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      setStatus('err');
      return;
    }

    if (!formRef.current) {
      console.error('Form reference not found');
      setStatus('err');
      return;
    }

    console.log('[Debug] Executing reCAPTCHA...');
    const token = await executeRecaptcha('doctor_application');
    console.log('[Debug] reCAPTCHA token:', token);

    const form = new FormData(formRef.current)
    const payload = Object.fromEntries(form.entries())
    
    const res = await fetch('/api/doctor-application', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, token })
    })
    
    setStatus(res.ok ? 'ok' : 'err')
    if (res.ok) {
      formRef.current.reset();
    }
  }, [executeRecaptcha]);

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Indicar médico</h1>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Nome completo</label>
          <input name="fullName" required maxLength={300} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">CRM</label>
            <input name="crm" required maxLength={300} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Especialidade</label>
            <input name="specialty" required maxLength={300} className="w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">UF</label>
            <input name="state" required maxLength={2} className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Cidade</label>
            <input name="city" maxLength={300} className="w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm">E-mail</label>
          <input type="email" name="email" required maxLength={300} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">Telefone</label>
          <input type="tel" name="phone" maxLength={300} className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm">Observações</label>
          <textarea name="observations" rows={3} maxLength={400} className="w-full rounded-md border px-3 py-2" />
        </div>
        <button type="submit" disabled={status === 'loading'} className="rounded-lg border px-4 py-2 disabled:opacity-50">
          {status === 'loading' ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {status === 'ok' && <p className="text-green-700">Sua indicação foi enviada para o responsável e será analisada e validada. Caso o médico seja real e tenha interesse de ser incluído na lista, ele aparecerá na aba de médicos. Agradecemos imensamente sua indicação.</p>}
      {status === 'err' && <p className="text-red-700">Falha ao enviar. Verifique os dados ou tente novamente.</p>}
    </main>
  )
}

// Componente principal da página que fornece o contexto do reCAPTCHA
export default function IndicarMedicoPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  console.log('[Debug] NEXT_PUBLIC_RECAPTCHA_SITE_KEY:', siteKey);

  if (!siteKey) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-700">Erro: Chave de site do reCAPTCHA não encontrada.</p>
      </div>
    )
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <IndicarMedicoForm />
    </GoogleReCaptchaProvider>
  )
}
