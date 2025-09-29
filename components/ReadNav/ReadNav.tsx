"use client"
import React, { useState } from "react";
import styles from "./readnav.module.css";
// import Image from "next/image";
import Link from "next/link";

interface ReadNavProps {
  title: string;
  increaseFont: () => void;
  decreaseFont: () => void;
  fontSize: number;
}
function ReadNav({ title, increaseFont, decreaseFont, fontSize }: ReadNavProps) {

  const [darkmode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((dark: boolean) => {
      const isDark = !dark
      if (isDark) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    return isDark
    })
  }

 
  return (
    <div className={styles.readNav}>
      <div className={styles.backBtn}>
        <Link href={`/Books`}>
        <button>Back</button>
        </Link>
        </div>
      <div className="title">{title}</div>
      <div className={styles.readSettings}>

        <button className={styles.savebtn}>Save</button>
        
        <div className={styles.fontSize}>
          <button onClick={decreaseFont} className={styles.savebtn}>-</button>
          {fontSize}
          <button onClick={increaseFont} className={styles.savebtn}>+</button>
        </div>
        <button onClick={toggleDarkMode} className="darkmode">
          {darkmode ? "Light" : "Dark"}
          </button>
      </div>
    
    </div>
  );
}

export default ReadNav;
