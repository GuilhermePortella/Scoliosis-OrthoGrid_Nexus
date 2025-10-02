import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const formData = data;

    // 1. Verificação do token do reCAPTCHA
    // const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-form-urlencoded' },
    //   body: `secret=${recaptchaSecret}&response=${token}`
    // });
    // const recaptchaData = await recaptchaResponse.json();

    // if (!recaptchaData.success || recaptchaData.score < 0.5) {
    //   return NextResponse.json({ ok: false, message: 'Falha na verificação do reCAPTCHA.' }, { status: 400 });
    // }

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
      <p>Um novo médico foi indicado através do site (reCAPTCHA temporariamente desabilitado para teste).</p>
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

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, message: 'Indicação enviada com sucesso!' })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: 'Falha ao enviar a indicação.' }, { status: 500 })
  }
}