"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@cpe/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@cpe/shared/components/ui/card";
import { Textarea } from "@cpe/shared/components/ui/textarea";
import { Badge } from "@cpe/shared/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@cpe/shared/components/ui/alert";

export default function SubmitPostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const characterLimit = 280;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("freedom_wall")
        .insert([{ content: content.trim(), status: "approved" }]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Thought broadcasted successfully! Redirecting...",
      });

      setContent("");

      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 2000);

    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-4">

        <button
          onClick={() => router.push("/admin/dashboard")}
          className="text-xs text-text-dim hover:text-accent-glow flex items-center gap-1.5 transition cursor-pointer font-medium pl-1 group font-mono"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">&larr;</span> Back to Dashboard
        </button>

        {message && (
          <Alert className={`rounded-xl border ${message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
              : "bg-red-500/10 text-red-400 border-red-500/25"
            }`}>
            <span className="text-base">{message.type === "success" ? "✨" : "🛑"}</span>
            <AlertTitle className="font-bold tracking-tight text-sm ml-2 inline-block">
              {message.type === "success" ? "Broadcast Success" : "Error"}
            </AlertTitle>
            <AlertDescription className="text-xs font-light mt-1 block pl-6">
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <Card className="rounded-2xl overflow-hidden glass-card glow-border">
          <CardHeader className="pb-5">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-xl font-black tracking-tight text-text-primary">
                Post to the Freedom Wall
              </CardTitle>
              <Badge className="bg-accent-glow/10 text-accent-glow border border-accent-glow/25 text-[10px] uppercase font-bold tracking-wider rounded-md px-2.5 py-1 shrink-0">
                🔒 Anonymous
              </Badge>
            </div>
            <CardDescription className="text-text-muted text-xs font-light mt-1.5 leading-relaxed">
              Your submission is completely anonymous. Express your campus feedback or constructive thoughts responsibly.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pb-4">
              <div className="relative">
                <Textarea
                  placeholder="What's on your mind, Computer Engineer?"
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, characterLimit))}
                  rows={8}
                  disabled={isSubmitting}
                  className="resize-none rounded-xl border-border-subtle focus-visible:border-border-glow bg-bg-elevated p-4 text-sm font-light leading-relaxed placeholder:text-text-dim"
                />

                <span className={`absolute bottom-3 right-4 text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-surface border ${content.length >= characterLimit
                    ? "text-red-400 font-bold border-red-500/25 animate-pulse"
                    : "text-text-dim border-border-subtle"
                  }`}>
                  {content.length}/{characterLimit}
                </span>
              </div>
            </CardContent>

            <div className="px-6 pb-6 pt-3 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[10px] text-text-dim italic font-light max-w-sm leading-normal">
                Submissions are evaluated under department guidelines and accountable anonymity frameworks.
              </span>

              <Button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-sm h-11 px-6 rounded-xl glow-btn hover:opacity-90 transition-all active:scale-[0.99] cursor-pointer w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  "Broadcast Anonymously 🚀"
                )}
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </main>
  );
}
