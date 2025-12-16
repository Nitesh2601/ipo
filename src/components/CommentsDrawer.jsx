"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { toast } from "sonner"
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ===============================
//   Fetch Comments Hook
// ===============================
function useComments(symbol) {
  return useQuery({
    queryKey: ["comments", symbol],
    queryFn: async () => {
      if (!symbol) return [];

      const res = await fetch(`/api/comments/${symbol}`);
      if (!res.ok) throw new Error("Failed to fetch comments");

      const data = await res.json();
      return data.comments;  // array of comments
    },
    enabled: !!symbol, // run only when symbol exists
  });
}

// ===============================
//   Add Comment Hook
// ===============================
function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      const res = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      return res.json();
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["comments", variables.symbol]);
    },
  });
}



// delete comment 


function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, userId }) => {
      const res = await fetch("/api/comments/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, userId }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["comments", variables.symbol]);
    },
  });
}







// =============================================
//         MAIN COMMENTS DRAWER COMPONENT
// =============================================
export function CommentsDrawer({ selectedIpo, open, setOpen }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [newComment, setNewComment] = useState("");

  const symbol = selectedIpo?.symbol;

  const { data: comments, isLoading } = useComments(symbol);

  const addCommentMutation = useAddComment();
  const deleteCommentMutation = useDeleteComment();

  const handleAddComment = () => {
    if (!newComment.trim()) return toast.warning("Comment cannot be empty");
    

    if (!userId) return toast.error("You must be logged in to Add a comment");

    addCommentMutation.mutate({
      symbol,
      comment: newComment,
      userId,
    });

    setNewComment("");
  };

  

  const handleDeleteComment = (commentId) => {
    if (!userId) return alert("You must be logged in");
  
    deleteCommentMutation.mutate({
      commentId,
      userId,
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent >
        <DrawerHeader>
          <DrawerTitle>Comments for {selectedIpo?.companyName}</DrawerTitle>
          
        </DrawerHeader>

        <div className="p-4">
          <h2 className=" text-gray-500 font-semibold">
             Add or view comments related to this IPO
          </h2>

          {/* Comments List */}
          <div className="mt-4 space-y-3 h-[200px] overflow-y-auto ">
            {isLoading ? (
              <p>Loading...</p>
            ) : comments?.length ? (
              comments.map((c) => (
                
                <div
                    key={c.id}
                    className="p-2 border rounded-lg flex justify-between items-start bg-gray-50"
                  >
                    {/* Left side: username + comment */}
                    <div className="flex gap-1">
                      <h1 className="font-semibold">{c.User?.username}:</h1>
                      <p>{c.text}</p>
                    </div>

                    {/* Right side: Delete button (only for owner) */}
                    {c.userId === userId && (
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-red-500 px-2 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>

              ))
            ) : (
              <p className="text-gray-500">No comments yet</p>
            )}
          </div>

          {/* Add comment */}
          <div className="mt-4 flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-[#35a13f] rounded-lg px-3 py-2"
              placeholder="Write a comment..."
            />

            <Button
            className='bg-[#35a13f] text-white  hover:bg-[#2f8f38]'
             onClick={handleAddComment}>Add</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
