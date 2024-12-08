import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Send, Pencil,Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments,createComment, updateComment,deleteComment
} from "../store/actions/CommentActions";
import { selectCommentsState } from "../store/reducers/CommentsReducers";

export default function Comments() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { commentsList: comments, loading, error } = useSelector(selectCommentsState);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [editedMessage, setEditedMessage] = useState("");

    useEffect(() => {
        dispatch(fetchComments(id));
    }, [id, dispatch]);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            dispatch(createComment({ message: newComment, chapter_id: id }));
            setNewComment("");
        }
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment._id);
        setEditedMessage(comment.message);
    };

    const handleUpdateComment = (e, commentId) => {
        e.preventDefault();
        if (editedMessage.trim()) {
            dispatch(updateComment({ 
                comment_id: commentId, 
                message: editedMessage 
            }));
            setEditingComment(null);
            setEditedMessage("");
        }
    };

    const handleDeleteComment = (commentId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
            dispatch(deleteComment(commentId));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-200 rounded-full mb-4"></div>
                    <div className="text-lg text-gray-600">Loading comments...</div>
                </div>
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                <img
                                    src={comment.author_id?.photo || "/default-avatar.png"}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        {comment.author_id?.name || "Anonymous"}
                                    </p>
                                    {editingComment === comment._id ? (
                                        <form onSubmit={(e) => handleUpdateComment(e, comment._id)}>
                                            <input
                                                type="text"
                                                value={editedMessage}
                                                onChange={(e) => setEditedMessage(e.target.value)}
                                                className="w-full p-2 border rounded-md"
                                                autoFocus
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    type="submit"
                                                    className="text-sm text-blue-500 hover:text-blue-600"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingComment(null)}
                                                    className="text-sm text-gray-500 hover:text-gray-600"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p className="text-gray-500 text-sm">
                                            {comment.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        className="flex items-center gap-1 px-2 py-1 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50"
                                        onClick={() => handleEditComment(comment)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                        <span className="text-sm">Edit</span>
                                    </button>
                                    <button 
                                        className="flex items-center px-2 py-1 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50"
                                        onClick={() => handleDeleteComment(comment._id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1 ml-11">
                                {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Comment Input */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t md:relative md:mt-6">
                <form onSubmit={handleSubmitComment} className="max-w-3xl mx-auto">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Say something here..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                            <Send className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}