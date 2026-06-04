"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Post {
  id: string;
  content: string;
  created_at: string;
}

export default function RealtimeFreedomWall({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const channel = supabaseClient
      .channel("realtime-freedom-wall")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "freedom_wall", filter: "status=eq.approved" },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((prev) => [newPost, ...prev.slice(0, 14)]);
        }
      )
      .subscribe();
    return () => { supabaseClient.removeChannel(channel); };
  }, []);

  return (
    <div className="glass-card glow-border rounded-2xl overflow-hidden flex flex-col h-160">

      {/* Header */}
      <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-black text-text-primary flex items-center gap-2">
            <span className="text-grad-cyan font-mono text-xs">//</span>
            Live Freedom Wall
          </h2>
          <p className="text-[10px] text-text-dim font-mono mt-0.5">
            Accountable anonymous pipeline · WebSockets
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold border border-emerald-500/20 tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-bg-elevated border border-border-subtle border-l-2 border-l-accent-glow/50 p-4 rounded-xl hover:border-border-glow transition-all duration-200 flex flex-col gap-2.5"
            >
              <p className="leading-relaxed text-sm text-text-primary wrap-break-word font-light">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-text-dim border-t border-border-subtle pt-2">
                <span className="tracking-tight">⚡ cpe_node_anon</span>
                <span className="bg-bg-surface px-1.5 py-0.5 rounded tracking-wider uppercase">
                  {new Date(post.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 py-12">
            <span className="text-2xl opacity-20">📭</span>
            <p className="text-xs text-text-dim font-mono tracking-wide italic text-center">
              No runtime transmissions captured.<br />Be the first to stream a node.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="p-4 border-t border-border-subtle shrink-0">
        <a href="/freedom-wall/submit" className="block">
          <button className="w-full bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-sm h-11 rounded-xl glow-btn hover:opacity-90 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer group">
            <span className="transition-transform group-hover:rotate-12 duration-200">✏️</span>
            Express an Anonymous Thought
          </button>
        </a>
      </div>
    </div>
  );
}
