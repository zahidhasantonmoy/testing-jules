import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Basic in-memory rate limiting (IP -> { count, resetTime })
const rateLimit = new Map<string, { count: number, resetTime: number }>();

const LIMIT = 5; // Max 5 requests
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit check
    const now = Date.now();
    const currentRecord = rateLimit.get(ip);

    if (currentRecord) {
      if (now < currentRecord.resetTime) {
        if (currentRecord.count >= LIMIT) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        currentRecord.count++;
      } else {
        rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
      }
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    // Parse the body
    const body = await req.json();
    const { user_name, user_email, message } = body;

    if (!user_name || !user_email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials not found in environment. Email simulated.');
        return NextResponse.json(
          { success: true, message: 'Message received successfully (simulated).' },
          { status: 200 }
        );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this or make it configurable
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Sending to yourself
      replyTo: user_email,
      subject: `New Contact Form Submission from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Message received successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
