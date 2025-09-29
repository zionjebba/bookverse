"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

export default function LandingPage() {
return (
 <>

   <Navbar />

   <main className={styles.wrapper}>
     <div className={styles.landing}>
       <div className={styles.hero}>
         <div className={styles.heroText}>
           <h1 className={styles.title}>Welcome to BookVerse</h1>
           <p className={styles.subtitle}>
             Discover, read, and organize your favorite books. Build your own
             library and explore millions of titles powered by the OpenLibrary API.
           </p>
           <Link href="/login"><button className={styles.heroBtn}>Get Started</button></Link>
         </div>

         <div className={styles.heroImage}>
           <Image
             src="/books-img.jpg"
             alt="Books stacked on a shelf"
             width={400}
             height={500}
           />
         </div>
       </div>

       <section className={styles.featured}>
         <h2 className={styles.featuredTitle}>Our Bestsellers</h2>
         <Carousel />
       </section>

       <section className={styles.uploads}>
        <h2 className={styles.featuredTitle}>Upload a book</h2>
          <div className={styles.st}>
             <Image
             src="/laptop-img.jpg"
             alt="Laptop"
             width={400}
             height={500}
           />   
           <div> 
            <p>Start your writing career today! Got a project in mind? 
           Upload your book on Bookverse and watch your engagement skyrocket 
           as millions of readers discover you</p>
                      <Link href="/login"><button className={styles.heroBtn}>+ Upload</button></Link>

 </div>     
          
     
          </div>
           </section>

             <section className={styles.uploads}>
        <h2 className={styles.featuredTitle}>Build your own Library</h2>
          <div className={styles.st}>
             <Image
             src="/library-img.jpg"
             alt="Laptop"
             width={400}
             height={500}
           />        
           <div>
                       <p>Create a personalized collections of your favourie books as you browse your shelves. </p>
           <Link href="/login"><button className={styles.heroBtn}>Get Started</button></Link>

           </div>
     
          </div>
           </section>
     </div>
   </main>
 </>
);  
}
