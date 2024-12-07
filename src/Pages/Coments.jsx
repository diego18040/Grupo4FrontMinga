import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";

export default function Comments() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/comments/chapter/${id}`
                );
                if (!response.ok) {
                    throw new Error("Error fetching comments");
                }
                const data = await response.json();
                setComments(data.response || []);
            } catch (err) {
                setError(err.message);
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                Loading comments...
            </div>
        );
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Comments</h1>
            </div>

            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center">No comments yet</p>
                ) : (
                    comments.map((comment) => (
                        <div 
                            key={comment._id} 
                            className={`p-4 rounded-lg shadow ${
                                comment.company_id ? 'bg-blue-50 ml-8' : 'bg-white'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {comment.author_id ? (
                                    // Comentario de autor
                                    <>
                                        <img
                                            src={comment.author_id.photo || "/default-avatar.png"}
                                            alt={comment.author_id.name || "Anonymous"}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {comment.author_id.name || "Anonymous"}
                                            </p>
                                            <p className="text-sm text-gray-500">Author</p>
                                        </div>
                                    </>
                                ) : (
                                    // Comentario de compañía
                                    <>
                                        <img
                                            src={comment.company_id?.photo || "/default-company.png"}
                                            alt={comment.company_id?.name}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {comment.company_id?.name}
                                            </p>
                                            <p className="text-sm text-blue-600">Publisher</p>
                                        </div>
                                    </>
                                )}
                                <p className="text-sm text-gray-500 ml-auto">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-700 mt-2">{comment.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}