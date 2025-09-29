"use client";
import React, { useState, useEffect } from "react";
import styles from "./bookdetails.module.css";
import CommentsSection from "@/components/CommentsSection/CommentsSection";
import Link from "next/link";

interface BookDetailsPageProps {
  params: {
    id: string[];
  };
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const bookKey = params.id.join("/");
  const apiUrl = `https://openlibrary.org/${bookKey}.json`;

  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBook();
  }, [apiUrl]);

  const toggleLikeBtn = () => setLiked((prev) => !prev);
  const toggleSaveBtn = () => setSaved((prev) => !prev);

  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <>
      <div className={styles.topBar}>
        <Link href="/bookstore" >
          <button className={styles.backBtn}>← Back</button>
        </Link>
        <button className={styles.saveBtn} onClick={toggleSaveBtn}>
          {saved ? "Saved" : "Save to Library"}
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>{book.title}</h1>

          {book.description && (
            <p className={styles.description}>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          <div className={styles.likes}>
            <button className={styles.likeBtn} onClick={toggleLikeBtn}>
              {liked ? "Unlike" : "Like"}
            </button>
          </div>
        </div>

        <div className={styles.right}>
          {book.covers?.length > 0 && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={book.title}
              className={styles.cover}
            />
          )}
        </div>
      </div>

      <div className={styles.comments}>
        <CommentsSection />
      </div>
    </>
  );
}
