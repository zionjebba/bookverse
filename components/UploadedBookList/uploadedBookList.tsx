import React from "react";
import styles from "./uploadedbooklist.module.css";

interface UploadedBook {
  id: string;
  title: string;
  author: string;
  url: string;
}

interface UploadedBooksListProps {
  books: UploadedBook[];
}

export default function UploadedBooksList({ books }: UploadedBooksListProps) {
  if (books.length === 0) {
    return <p className={styles.noBooks}>No books uploaded yet.</p>;
  }

  return (
    <div className={styles.uploadedList}>
      <h2 className={styles.heading}>My Uploaded Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className={styles.bookItem}>
            <h3>{book.title}</h3>
            <p>{book.author || "Unknown Author"}</p>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              Open Book
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
