import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  subject: z.string().trim().min(1, "Subject is required").max(160),
  message: z
    .string()
    .trim()
    .min(5, "Please enter a brief message (at least 5 characters)")
    .max(3000),
  website: z.string().max(0).optional(), // honeypot
});

const rateWindowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 60000);
const rateLimitMax = Number(process.env.CONTACT_RATE_LIMIT_MAX || 10);
const ipBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const prev = (ipBuckets.get(ip) || []).filter((ts) => now - ts < rateWindowMs);
  if (prev.length >= rateLimitMax) {
    ipBuckets.set(ip, prev);
    return true;
  }
  prev.push(now);
  ipBuckets.set(ip, prev);
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: firstIssue?.message || "Please check all required fields." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, subject, message } = parsed.data;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (webhookUrl) {
    try {
      const resp = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!resp.ok) {
        return NextResponse.json(
          { ok: false, error: "External delivery endpoint rejected the request." },
          { status: 502 }
        );
      }
      return NextResponse.json({
        ok: true,
        deliveryMode: "configured-webhook",
        message: "Enquiry submitted to configured delivery endpoint.",
      });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Unable to reach configured delivery endpoint." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    ok: true,
    deliveryMode: "demonstration",
    message:
      "Local demonstration mode: enquiry validated successfully. No external advisor mailbox or CRM is connected in this environment.",
  });
}
