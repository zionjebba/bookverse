

"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./bookstore.module.css";
import Link from "next/link";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

interface Author {
  name: string;
  key: string;
}

interface Book {
  key: string;
  title: string;
  cover_id?: number;
  authors?: Author[];
}

const categories = [
  "fantasy",
  "science_fiction",
  "romance",
  "history",
  "mystery",
];

export default function BookstorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState("fantasy");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      try {
        const url = searchTerm
          ? `https://openlibrary.org/search.json?q=${encodeURIComponent(
              searchTerm
            )}`
          : `https://openlibrary.org/subjects/${category}.json?limit=20`;

        const res = await fetch(url, {
          signal: abortControllerRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        const data = await res.json();

        if (searchTerm) {
          setBooks(
            data.docs.map((d: any) => ({
              key: d.key,
              title: d.title,
              cover_id: d.cover_i,
              authors: d.author_name?.map((name: string, id: number) => ({
                name,
                key: `${d.key}-author-${id}`,
              })),
            }))
          );
        } else {
          setBooks(
            (data.works || []).map((d: any) => ({
              key: d.key,
              title: d.title,
              cover_id: d.cover_id,
              authors: d.authors?.map((a: any) => ({
                name: a.name,
                key: a.key,
              })),
            }))
          );
        }
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
      console.log(books.keys);
    };

    fetchBooks();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [category, searchTerm]);

  return (
    <>
    <Navbar />
       <div className={styles.wrapper}>  
       <Sidebar />

      <div className={styles.container}>
       
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* category dropdown (only if not searching) */}
        <div className={styles.categories}>
          Category: <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        {/* results */}
        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p className={styles.error}>Error: {error}</p>
        ) : books.length === 0 ? (
          <p className={styles.noResults}>No books found.</p>
        ) : (
          <div className={styles.bookGrid}>
            {books.map((book) => (
              <Link
                key={book.key}
                href={`/bookdetails${book.key}`} 
              >
                <div className={styles.cardWrapper}>
                  <img
                    src={
                      book.cover_id
                        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                        : "/placeholder.png"
                    }
                    alt={book.title}
                    className={styles.cover}
                  />
                  <h3 className={styles.title} title={book.title}>
                    {book.title}
                  </h3>
                  <p className={styles.author}>
                    {book.authors?.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
