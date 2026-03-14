"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SubmitPage() {
  const [companyName, setCompanyName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !videoUrl.trim()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("companyName", companyName.trim());
      formData.append("videoUrl", videoUrl.trim());
      if (videoFile) {
        formData.append("videoFile", videoFile);
      }

      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main className="max-w-2xl mx-auto px-5 py-12 md:py-20">
        <header className="mb-12">
          <Link href="/">
            <Image src="/logo.svg" alt="Spool.film" width={160} height={35} priority />
          </Link>
        </header>

        <div className="text-center py-16">
          <h1 className="text-2xl font-semibold mb-4">Thank you for your submission!</h1>
          <p className="text-muted mb-8">
            Our team will review it and publish if we deem it worthy. We appreciate you sharing great work with us.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
            >
              Back to Spool
            </Link>
            <a
              href="https://x.com/SpoolFilm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 border border-border rounded-md hover:opacity-70 transition-opacity"
            >
              Follow @SpoolFilm
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-5 py-12 md:py-20">
      <header className="mb-12 flex items-start justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="Spool.film" width={160} height={35} priority />
        </Link>
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Back
        </Link>
      </header>

      <h1 className="text-2xl font-semibold mb-2">Submit a Video</h1>
      <p className="text-muted text-sm mb-8">
        Know a great product launch video? Submit it below and our team will review it for publication.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-1.5">
            Company Name <span className="text-muted">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Apple, Linear, Nothing"
            className="w-full px-3 py-2.5 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1.5">
            Video URL <span className="text-muted">*</span>
          </label>
          <input
            id="videoUrl"
            type="url"
            required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-3 py-2.5 bg-transparent border border-border rounded-md text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted/50"
          />
        </div>

        <div>
          <label htmlFor="videoFile" className="block text-sm font-medium mb-1.5">
            Video Upload <span className="text-muted">(optional — wide format, high quality ideal)</span>
          </label>
          <input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-border file:text-sm file:font-medium file:bg-transparent file:text-foreground hover:file:opacity-70 file:cursor-pointer file:transition-opacity"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-2.5 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Submit Video"}
        </button>
      </form>
    </main>
  );
}
