"use client";
import React, { useState } from "react";
import styles from "./books.module.css";
import Link from "next/link";
import books from "../../components/lib/mockData";
import BookCard from "../../components/bookcard/BookCard";
import { Book } from "../../components/lib/types";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";

function Books() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        {showSidebar && <Sidebar />}
        <div className={styles.booksContainer}>
          <div className={styles.actions}>
            <button onClick={toggleSidebar} className={styles.toggleBtn}>
              {showSidebar ? "Hide Sidebar" : "Show Sidebar"}
            </button>
           <Link href='/Upload'><button className={styles.uploadBtn}>+ Upload</button></Link> 
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <h1 className={styles.title}>My Library </h1>
          <ul className={styles.booksGrid}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book: Book, i: number) => (
                <li key={i}>
                  <Link href={`../bookpage/${book.id}`}>
                    <BookCard
                      title={book.title}
                      coverImage={book.image}
                      description={book.description}
                    />
                  </Link>
                </li>
              ))
            ) : (
              <p className={styles.noResults}>No books found.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Books;
