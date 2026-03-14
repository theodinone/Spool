import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    // Duplicate check
    const existing = await writeClient.fetch(
      `count(*[_type == "subscriber" && email == $email])`,
      { email: normalised }
    );

    if (existing > 0) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    await writeClient.create({
      _type: "subscriber",
      email: normalised,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
