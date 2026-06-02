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
    <Card className="border-slate-200 bg-white shadow-sm h-[640px] flex flex-col rounded-2xl overflow-hidden border-t-4 border-t-university-maroon">
      <CardHeader className="pb-3 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
            🕊️ Live Freedom Wall
          </CardTitle>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE FEED
          </div>
        </div>
        <CardDescription className="text-xs text-slate-500 font-light mt-1">
          Accountable anonymous pipeline. Powered by live WebSockets.
        </CardDescription>
      </CardHeader>

      {/* Optimized view pane with elegant custom scrollbars */}
      <CardContent className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-50/30 scrollbar-thin scrollbar-thumb-slate-200">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-slate-100 p-4 rounded-xl text-sm text-slate-700 shadow-2xs transition duration-200 transform hover:scale-[1.01]"
            >
              <p className="leading-relaxed font-normal text-slate-600">{post.content}</p>
              <span className="block text-[10px] text-slate-400 font-mono text-right mt-2">
                {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-slate-400 italic text-center py-12">The wall is silent. Be the first to break the ice.</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 bg-white border-t border-slate-100">
        <a href="/freedom-wall/submit" className="w-full">
          <Button className="w-full bg-university-maroon hover:bg-[#5a0c22] text-white font-bold text-sm h-11 rounded-xl shadow-xs transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer">
            <span>✏️</span> Express an Anonymous Thought
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
