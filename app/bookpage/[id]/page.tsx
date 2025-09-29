"use client";
import React, { useState } from "react";
import books from "../../../components/lib/mockData";
import { useParams } from "next/navigation";
import styles from "./bookpage.module.css";
import ReadNav from "@/components/ReadNav/ReadNav";

function Page() {

    const [fontSize, setFontSize] = useState(16)
const increaseFont = () => setFontSize((size) => Math.min(size + 2, 32));
const decreaseFont = () => setFontSize((size) => Math.max(size - 2, 12));

  const { id } = useParams();
  const selectedBook = books.find((book) => String(book.id) === id);

  if (!selectedBook) return <p>Book not found</p>;

  const pageSize = 1000; 
  const pages = [];

  for (let i = 0; i < selectedBook.content.length; i += pageSize) {
    pages.push(selectedBook.content.slice(i, i + pageSize));
  }

  const [currentPage, setCurrentPage] = useState(0);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 2, 0));
  const goNext = () =>
    setCurrentPage((p) => Math.min(p + 2, pages.length - 2));

  const leftPage = pages[currentPage] || "";
  const rightPage = pages[currentPage + 1] || "";

  return (
    <>
    <div className="readnav">
      <ReadNav fontSize={fontSize} decreaseFont={decreaseFont} increaseFont={increaseFont} title={selectedBook.title} />
    </div>
    <div className={styles.pages}>
      <button onClick={goPrev} className={styles.prevBtn}>
        Prev
      </button>

      <div className={styles.leftPage} style={{ fontSize: `${fontSize}px` }}>
        <p>{leftPage}</p>
      </div>

      <div className={styles.rightPage} style={{ fontSize: `${fontSize}px` }}>
        <p>{rightPage}</p>
      </div>

      <button onClick={goNext} className={styles.nextBtn}>
        Next
      </button>
    </div>
    </>
  );
}

export default Page;
