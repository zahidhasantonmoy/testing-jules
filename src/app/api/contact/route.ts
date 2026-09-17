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

    // Initialize Nodemailer transporter (uses SMTP variables if present)
    // For local dev, we will log to console if no SMTP config is found.
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${user_name}" <${process.env.SMTP_USER}>`,
        replyTo: user_email,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Submission from ${user_name}`,
        text: `Name: ${user_name}\nEmail: ${user_email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${user_name}</p><p><strong>Email:</strong> ${user_email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
      });
      console.log(`Email sent successfully for: ${user_name} (${user_email})`);
    } else {
      console.log('No SMTP config found. Mocking email delivery.');
      console.log(`Mock Email Data:\nName: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`);
    }

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
