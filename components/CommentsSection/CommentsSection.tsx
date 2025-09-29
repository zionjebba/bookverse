"use client";
import React, { useState } from "react";
import styles from "./comments.module.css";

interface Comment {
  id: string;
  user: string;
  text: string;
  createdAt: Date;
}

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user,
      text,
      createdAt: new Date(),
    };

    setComments((prev) => [newComment, ...prev]);
    setUser("");
    setText("");
  };

  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.heading}>Comments</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${styles.input} ${styles.textInput}`}
        />
        <button type="submit" className={styles.submitBtn}>
          Add Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className={styles.noComments}>No comments yet. Be the first!</p>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <strong>{comment.user}</strong>
                <span className={styles.date}>
                  {comment.createdAt.toLocaleString()}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
