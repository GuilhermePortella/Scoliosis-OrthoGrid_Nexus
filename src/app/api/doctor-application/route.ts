import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  console.log('[API] Recebida nova requisição de indicação de médico.');
  try {
    const data = await req.json()
    const { token, ...formData } = data;
    console.log('[API] Token recebido no backend:', token);
    console.log('[API] Dados recebidos:', { fullName: formData.fullName, crm: formData.crm });

    // 1. Verificação do token do reCAPTCHA
    console.log('[API] Verificando reCAPTCHA...');
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${token}`
    });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn('[API] Falha na verificação do reCAPTCHA.', { score: recaptchaData.score, success: recaptchaData.success });
      return NextResponse.json({ ok: false, message: 'Falha na verificação do reCAPTCHA.' }, { status: 400 });
    }
    console.log('[API] reCAPTCHA verificado com sucesso.', { score: recaptchaData.score });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = `
      <h1>Nova Indicação de Médico</h1>
      <p>Um novo médico foi indicado através do site (Pontuação reCAPTCHA: ${recaptchaData.score.toFixed(2)}).</p>
      <ul>
        <li><strong>Nome Completo:</strong> ${formData.fullName}</li>
        <li><strong>CRM:</strong> ${formData.crm}</li>
        <li><strong>Especialidade:</strong> ${formData.specialty}</li>
        <li><strong>UF:</strong> ${formData.state}</li>
        <li><strong>Cidade:</strong> ${formData.city}</li>
        <li><strong>E-mail de contato:</strong> ${formData.email}</li>
        <li><strong>Telefone:</strong> ${formData.phone}</li>
        <li><strong>Observações:</strong> ${formData.observations}</li>
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

    return NextResponse.json({ ok: true, message: 'Indicação enviada com sucesso!' })
  } catch (error) {
    console.error('[API] Erro no processamento da requisição:', error);
    return NextResponse.json({ ok: false, message: 'Falha ao enviar a indicação.' }, { status: 500 })
  }
}