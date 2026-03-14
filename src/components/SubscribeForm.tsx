"use client";

import { useState, FormEvent } from "react";

export default function SubscribeForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setState("success");
      setMessage("You're in. We'll keep you posted.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Try again later.");
    }
  }

  if (state === "success") {
    return (
      <div className={compact ? "" : "text-center"}>
        <p className="text-sm text-green-400">{message}</p>
      </div>
    );
  }

  return (
    <div className={compact ? "" : "text-center"}>
      {!compact && (
        <h2 className="text-lg font-semibold tracking-tight mb-1.5">
          Stay in the loop
        </h2>
      )}
      <p className="text-sm text-muted mb-4">
        {compact
          ? "Get notified about new films."
          : "Get notified when we drop new films."}
      </p>
      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 ${compact ? "" : "justify-center"} max-w-md ${compact ? "" : "mx-auto"}`}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="flex-1 bg-border/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-muted transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="px-4 py-2 bg-accent text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {state === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {state === "error" && (
        <p className="text-xs text-red-400 mt-2">{message}</p>
      )}
    </div>
  );
}
