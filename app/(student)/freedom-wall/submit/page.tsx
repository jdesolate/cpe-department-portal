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

        {/* Navigation Escape Route */}
        <button
          onClick={() => router.push("/")}
          className="text-xs text-slate-500 hover:text-university-maroon flex items-center gap-1 transition cursor-pointer font-medium pl-1"
        >
          ← Back to Department Portal
        </button>

        {/* Dynamic Status Notification Alert Banner (Now fully floating outside the card!) */}
        {message && (
          <Alert className={`animate-in fade-in slide-in-from-top-2 duration-200 border rounded-xl ${message.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-rose-50 text-rose-900 border-rose-200"
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

        <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="h-2 bg-org-blue" />

          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-slate-800">
                Post to the Freedom Wall
              </CardTitle>
              <Badge variant="outline" className="text-org-blue border-org-blue/20 bg-blue-50/50 text-[10px] uppercase font-semibold tracking-wider rounded-sm">
                🔒 Student Secure
              </Badge>
            </div>
            <CardDescription className="text-slate-400 text-xs font-light mt-1">
              Your submission is completely anonymous to your peers and the public interface. Express yourself constructively.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pb-4">
              <div className="relative">
                <Textarea
                  placeholder="What's on your mind, Computer Engineer? Share an encouraging message, feedback, or general campus query..."
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, characterLimit))}
                  rows={10}
                  disabled={isSubmitting}
                  className="resize-none rounded-lg border-slate-200 focus-visible:ring-org-blue focus-visible:border-org-blue p-4 text-sm font-light leading-relaxed placeholder:text-slate-400 bg-white"
                />

                <span className={`absolute bottom-3 right-3 text-[10px] font-mono ${content.length >= characterLimit ? "text-rose-500 font-bold" : "text-slate-400"
                  }`}>
                  {content.length}/{characterLimit}
                </span>
              </div>
            </CardContent>

            {/* Restructured Footer Content - Erases the stray line artifact */}
            <div className="px-6 pb-6 pt-2 bg-slate-50/30 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 italic font-light max-w-[240px] leading-tight">
                Submissions are logged under accountable anonymity policies.
              </span>

              <Button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="bg-org-blue hover:bg-blue-700 text-white font-semibold text-xs h-10 px-5 rounded-md shadow-xs transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5 p-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Broadcasting...
                  </>
                ) : (
                  <>🚀 Broadcast anonymously</>
                )}
              </Button>
            </div>
          </form>
        </Card>

      </div>
    </main>
  );
}
