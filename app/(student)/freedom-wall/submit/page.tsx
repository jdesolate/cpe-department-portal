"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
        text: "Thought broadcasted successfully! Redirecting back to the landing portal...",
      });

      setContent("");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);

    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "An unexpected security exception occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl mx-auto space-y-4">

        {/* 1. NAVIGATION ESCAPE ROUTE */}
        <button
          onClick={() => router.push("/")}
          className="text-xs text-slate-500 hover:text-university-maroon flex items-center gap-1.5 transition cursor-pointer font-medium pl-1 group"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">&larr;</span> Back to Department Portal
        </button>

        {/* 2. SYSTEM GATEWAY NOTIFICATION BANNER */}
        {message && (
          <Alert className={`animate-in fade-in slide-in-from-top-2 duration-200 border rounded-xl shadow-xs ${message.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-950 border-rose-200"
            }`}>
            <span className="text-base">{message.type === "success" ? "✨" : "🛑"}</span>
            <AlertTitle className="font-bold tracking-tight text-sm ml-2 inline-block">
              {message.type === "success" ? "Broadcast Success" : "Security Gateway Intercept"}
            </AlertTitle>
            <AlertDescription className="text-xs font-light mt-1 text-slate-600 block pl-6">
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* 3. MAIN FORM CONTAINER CARD */}
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden bg-white">

          {/* Elite Institutional Gradient Top Accent Border */}
          <div className="h-2 bg-gradient-to-r from-university-maroon via-university-maroon to-university-gold" />

          <CardHeader className="pb-5">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-xl font-black tracking-tight text-slate-900">
                Post to the Freedom Wall
              </CardTitle>
              <Badge className="bg-university-gold/10 text-amber-800 border border-university-gold/30 text-[10px] uppercase font-bold tracking-wider rounded-md px-2.5 py-1 shrink-0">
                🔒 Student Secure
              </Badge>
            </div>
            <CardDescription className="text-slate-500 text-xs font-light mt-1.5 leading-relaxed">
              Your submission is completely anonymous to your peers and the public interface. Express your campus feedback or constructive technical thoughts responsibly.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pb-4">
              <div className="relative">
                <Textarea
                  placeholder="What's on your mind, Computer Engineer? Share an encouraging message, campus query, or system insight..."
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, characterLimit))}
                  rows={8}
                  disabled={isSubmitting}
                  className="resize-none rounded-xl border-slate-200 focus-visible:ring-2 focus-visible:ring-university-maroon focus-visible:border-university-maroon p-4 text-sm font-light leading-relaxed placeholder:text-slate-400 bg-white shadow-2xs transition-all duration-150"
                />

                {/* Character Counter Element */}
                <span className={`absolute bottom-3 right-4 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-50 border ${content.length >= characterLimit
                    ? "text-rose-500 font-bold border-rose-200 bg-rose-50/50 animate-pulse"
                    : "text-slate-400 border-slate-100"
                  }`}>
                  {content.length}/{characterLimit}
                </span>
              </div>
            </CardContent>

            {/* 4. CONTROL PAD FOOTER PANEL */}
            <div className="px-6 pb-6 pt-3 bg-slate-50/40 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[10px] text-slate-400 italic font-light max-w-sm leading-normal">
                Submissions are structural data points evaluated strictly under department guidelines and accountable anonymity frameworks.
              </span>

              <Button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="bg-university-maroon hover:bg-[#5a0c22] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-xs transition duration-150 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Broadcasting Node...</span>
                  </>
                ) : (
                  <>
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-150">🚀</span>
                    <span>Broadcast Anonymously</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </main>
  );
}
