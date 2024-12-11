import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Send, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../store/actions/CommentActions";
import { selectCommentsState } from "../store/reducers/CommentsReducers";

export default function Comments() {
  const { id: chapterId } = useParams();
  const dispatch = useDispatch();
  const { commentsList: comments, error } = useSelector(selectCommentsState);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (chapterId) {
      dispatch(fetchComments(chapterId));
    }
  }, [chapterId, dispatch]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!token || !userId || !newComment.trim()) return;

    try {
      const commentData = {
        message: newComment,
        chapter_id: chapterId,
        user_id: userId,
      };

      await dispatch(createComment(commentData)).unwrap();
      setNewComment("");
      dispatch(fetchComments(chapterId));
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment._id);
    setEditedMessage(comment.message);
  };

  const handleUpdateComment = async (e, commentId) => {
    e.preventDefault();
    if (!token || !userId || !editedMessage.trim()) return;

    try {
      await dispatch(
        updateComment({
          _id: commentId,
          message: editedMessage,
          user_id: userId,
        })
      ).unwrap();

      setEditingComment(null);
      setEditedMessage("");
      dispatch(fetchComments(chapterId));
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!token || !userId) return;

    const isConfirmed = window.confirm("Do you want to delete this comment?");
    if (isConfirmed) {
      try {
        await dispatch(
          deleteComment({
            _id: commentId,
            user_id: userId,
          })
        ).unwrap();
        dispatch(fetchComments(chapterId));
      } catch (err) {
        console.error("Error deleting comment:", err);
      }
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {!userId && (
        <div className="text-center text-red-500 mb-4">
          You must log in to comment.
        </div>
      )}

      <div className="space-y-4 flex flex-col items-center mt-32">
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm w-full">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Be the first to comment</p>
          </div>
        ) : (
          comments.map((comment) => (
            
            <div
              key={comment._id}
              className="bg-white p-4 rounded-lg shadow-sm w-full"
            >
              <div className="flex items-start gap-3">
              <img
  src={
    comment.author_id?.photo || comment.company_id?.photo || "/default-avatar.png"
  }
  alt="Profile"
  className="w-10 h-10 rounded-full object-cover"
  onError={() => console.log("Error loading image")}
  onLoad={() => console.log("Image loaded successfully")}
  />

                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-lg">
                    {comment.company_id?.name || comment.author_id?.name || "Anonymous"}
                  </p>
                  {editingComment === comment._id ? (
                    <form
                      onSubmit={(e) => handleUpdateComment(e, comment._id)}
                      className="w-full"
                    >
                      <input
                        type="text"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className="w-full p-3 border rounded-md bg-gray-50"
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingComment(null)}
                          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-gray-600">{comment.message}</p>
                  )}
                </div>

                {userId === comment.company_id?.user_id ||
                userId === comment.author_id?.user_id ? (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 text-blue-500 hover:bg-blue-50"
                      onClick={() => handleEditComment(comment)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <form onSubmit={handleSubmitComment} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                userId ? "Write a comment..." : "Log in to write a comment..."
              }
              className="w-full bg-gray-100 rounded-full px-6 py-3 pr-12 focus:ring-pink-500"
              disabled={!userId}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-pink-500 text-white rounded-full p-2 hover:bg-pink-600"
              disabled={!userId || !newComment.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
