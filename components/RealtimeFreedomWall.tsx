"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Explicitly instantiate a client for subscription streams
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
    // Open standard low-overhead Postgres Replication stream via WebSockets
    const channel = supabaseClient
      .channel("realtime-freedom-wall")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "freedom_wall", filter: "status=eq.approved" },
        (payload) => {
          const newPost = payload.new as Post;
          setPosts((prev) => [newPost, ...prev.slice(0, 14)]); // Keep stack fixed to top 15 updates
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <Card className="border-slate-200 bg-white shadow-xs h-[640px] flex flex-col rounded-2xl overflow-hidden border-t-4 border-t-university-maroon transition-all duration-300">

      {/* 1. COMPONENT HEADER */}
      <CardHeader className="pb-4 bg-slate-50/60 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
            🕊️ Live Freedom Wall
          </CardTitle>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold border border-emerald-200 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE FEED
          </div>
        </div>
        <CardDescription className="text-xs text-slate-500 font-light mt-1">
          Accountable anonymous pipeline. Powered by live WebSockets.
        </CardDescription>
      </CardHeader>

      {/* 2. LIVE DATA STREAM PANE */}
      <CardContent className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-50/20 scrollbar-thin">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-200/60 border-l-4 border-l-university-gold p-4 rounded-xl transition-all duration-200 transform hover:scale-[1.01] hover:border-slate-300 shadow-2xs hover:shadow-xs flex flex-col justify-between gap-3"
            >
              <p className="leading-relaxed text-sm font-normal text-slate-700 break-words">
                {post.content}
              </p>

              {/* Dynamic Engineering Metadata Row */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-50 pt-2">
                <span className="text-slate-400/80 font-medium tracking-tight">
                  ⚡ cpe_node_anon
                </span>
                <span className="font-semibold tracking-wider uppercase bg-slate-50 px-1.5 py-0.5 rounded text-slate-400">
                  {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-2 py-12">
            <span className="text-2xl opacity-40">📭</span>
            <p className="text-xs text-slate-400 font-mono tracking-wide italic text-center">
              No runtime transmissions captured. <br />Be the first to stream a node.
            </p>
          </div>
        )}
      </CardContent>

      {/* 3. CTA INTERACTION PAD */}
      <CardFooter className="p-4 bg-white border-t border-slate-100">
        <a href="/freedom-wall/submit" className="w-full">
          <Button className="w-full bg-university-maroon hover:bg-[#5a0c22] text-white font-bold text-sm h-12 rounded-xl shadow-xs transition duration-150 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer group">
            <span className="transition-transform group-hover:rotate-12 duration-200">✏️</span>
            Express an Anonymous Thought
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}