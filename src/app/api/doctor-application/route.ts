import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  console.log('[API] Recebida nova requisição de indicação de médico.');
  try {
    const data = await req.json();
    const { token, ...formData } = data ?? {};

    if (!token || typeof token !== 'string') {
      console.warn('[API] Token reCAPTCHA ausente/ inválido');
      return NextResponse.json({ ok: false, message: 'Token reCAPTCHA ausente.' }, { status: 400 });
    }

    // 1) Verificação do reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error('[API] RECAPTCHA_SECRET_KEY não configurada');
      return NextResponse.json({ ok: false, message: 'Configuração do reCAPTCHA ausente.' }, { status: 500 });
    }

    console.log('[API] Verificando reCAPTCHA...');
    const params = new URLSearchParams({
      secret,
      response: token,
      // remoteip: opcional — pode enviar IP do cliente se desejar
    });

    const gRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // <- CORRETO
      body: params.toString(),
      cache: 'no-store',
    });

    const gJson: any = await gRes.json();
    // Log de diagnóstico (sanitizado)
    console.log('[API] reCAPTCHA resp:', {
      success: gJson?.success,
      score: gJson?.score,
      action: gJson?.action,
      'error-codes': gJson?.['error-codes'],
    });

    // Se for v3, score é número; se for v2, não existe score.
    const success = !!gJson?.success;
    const scoreOk = typeof gJson?.score === 'number' ? gJson.score >= 0.5 : true; // v2 não tem score

    if (!success || !scoreOk) {
      return NextResponse.json(
        { ok: false, message: 'Falha na verificação do reCAPTCHA.', details: gJson?.['error-codes'] ?? null },
        { status: 400 }
      );
    }

    // 2) Envio de e-mail
    const port = Number(process.env.SMTP_PORT ?? 0);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465, // TLS implícito
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const scoreStr = typeof gJson?.score === 'number' ? gJson.score.toFixed(2) : 'n/a';
    const emailHtml = `
      <h1>Nova Indicação de Médico</h1>
      <p>Um novo médico foi indicado através do site (Pontuação reCAPTCHA: ${scoreStr}).</p>
      <ul>
        <li><strong>Nome Completo:</strong> ${formData.fullName ?? ''}</li>
        <li><strong>CRM:</strong> ${formData.crm ?? ''}</li>
        <li><strong>Especialidade:</strong> ${formData.specialty ?? ''}</li>
        <li><strong>UF:</strong> ${formData.state ?? ''}</li>
        <li><strong>Cidade:</strong> ${formData.city ?? ''}</li>
        <li><strong>E-mail de contato:</strong> ${formData.email ?? ''}</li>
        <li><strong>Telefone:</strong> ${formData.phone ?? ''}</li>
        <li><strong>Observações:</strong> ${formData.observations ?? ''}</li>
      </ul>
    `;

    const mailOptions = {
      from: `"NF1-Hub" <${process.env.SMTP_SENDER_EMAIL}>`,
      to: 'guilhermeportella.dev@gmail.com',
      subject: 'Nova Indicação de Médico Recebida',
      html: emailHtml,
    };

    console.log('[API] Enviando e-mail...');
    await transporter.sendMail(mailOptions);
    console.log('[API] E-mail enviado com sucesso.');

    return NextResponse.json({ ok: true, message: 'Indicação enviada com sucesso!' });
  } catch (error) {
    console.error('[API] Erro no processamento da requisição:', error);
    return NextResponse.json({ ok: false, message: 'Falha ao enviar a indicação.' }, { status: 500 });
  }
}
