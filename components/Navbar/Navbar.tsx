"use client"
import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
let name = 'Reader'
function Navbar() {
  return (
      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}> BookVerse</h1>
        <div className={styles.profile}>
          <Link href="/login">
          =
          </Link>
                  <h1>Hello ${name}</h1>
</div>

      </nav>
  )
}

export default Navbar