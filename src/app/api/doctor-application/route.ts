import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailHtml = `
      <h1>Nova Indicação de Médico</h1>
      <p>Um novo médico foi indicado através do site.</p>
      <ul>
        <li><strong>Nome Completo:</strong> ${data.fullName}</li>
        <li><strong>CRM:</strong> ${data.crm}</li>
        <li><strong>Especialidade:</strong> ${data.specialty}</li>
        <li><strong>UF:</strong> ${data.state}</li>
        <li><strong>Cidade:</strong> ${data.city}</li>
        <li><strong>E-mail de contato:</strong> ${data.email}</li>
      </ul>
    `;

    // Opções do e-mail
    const mailOptions = {
      from: `"NF1-Hub" <${process.env.SMTP_SENDER_EMAIL}>`, 
      to: 'guilhermeportella.dev@gmail.com', 
      subject: 'Nova Indicação de Médico Recebida',
      html: emailHtml,
    };

    // Envia o e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, message: 'Indicação enviada com sucesso!' })
  } catch (error) {
    console.error(error);
    // Em caso de erro 500
    return NextResponse.json({ ok: false, message: 'Falha ao enviar a indicação.' }, { status: 500 })
  }
}
