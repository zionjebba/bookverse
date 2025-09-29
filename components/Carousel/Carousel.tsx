"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./carousel.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Book {
  key: string;
  title: string;
  cover_id?: number;
  authors?: { name: string }[];
}

function Carousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/subjects/fantasy.json?limit=10"
        );
        const data = await res.json();
        setBooks(
          (data.works || []).map((d: any) => ({
            key: d.key,
            title: d.title,
            cover_id: d.cover_id,
            authors: d.authors?.map((a: any) => ({ name: a.name })),
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280, // large screens
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 790, 
      settings: {
        slidesToShow: 2,
      },
    },
     {
      breakpoint: 480, // large screens
      settings: {
        slidesToShow: 1,
      },
    }
  ],
};


  if (loading) return <p>Loading books...</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.key} className={styles.card}>
            <div className={styles.cardImage}>
              <img
                src={
                  book.cover_id
                    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
                    : "/placeholder.png"
                }
                alt={book.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
            <h3 className={styles.cardTitle}>{book.title}</h3>
            <p className={styles.cardAuthor}>
              {book.authors?.map((a) => a.name).join(", ")}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

