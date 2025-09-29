"use client";
import React, { useState } from "react";
import UploadedBooksList from "../../components/UploadedBookList/uploadedBookList";
import styles from "./upload.module.css";
import Sidebar from "@/components/sidebar/sidebar";

export default function UploadBookPage() {
  const [uploadedBooks, setUploadedBooks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      file,
      url: URL.createObjectURL(file),
    };

    setUploadedBooks((prev) => [...prev, newBook]);

    // reset form
    setTitle("");
    setAuthor("");
    setFile(null);
  };

  return (
    <div className={styles.wrapper}>
    
    <Sidebar />
    <div className={styles.uploadContainer}>
      <h1 className={styles.title}>Upload Your Book</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.epub"
          onChange={handleFileChange}
          required
        />  
        <button type="submit">Upload</button>
      </form>

      <UploadedBooksList books={uploadedBooks} />
    </div>
    </div>
  );
}
