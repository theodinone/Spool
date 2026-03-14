import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const companyName = formData.get("companyName") as string;
    const videoUrl = formData.get("videoUrl") as string;

    if (!companyName?.trim() || !videoUrl?.trim()) {
      return NextResponse.json(
        { error: "Company name and video URL are required" },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { error: "Please enter a valid URL" },
        { status: 400 }
      );
    }

    // Create submission in Sanity
    await writeClient.create({
      _type: "submission",
      companyName: companyName.trim(),
      videoUrl: videoUrl.trim(),
      submittedAt: new Date().toISOString(),
      status: "pending",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
