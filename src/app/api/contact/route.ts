import { NextResponse } from 'next/server';

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

    // In a real application, you would send this to a database like Supabase
    // or send an email via Resend/Nodemailer here.
    // For now, we simulate a successful backend process.
    console.log(`Received contact from: ${user_name} (${user_email})`);

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
