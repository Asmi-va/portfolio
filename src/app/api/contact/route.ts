import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Configure transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vashistaasmi@gmail.com', // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // app password from Gmail
      },
    });

    const mailOptions = {
      from: email,
      to: 'vashistaasmi@gmail.com',
      subject: `Portfolio Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
} 