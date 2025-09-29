import React from 'react'
import styles from './bookcard.module.css'

function BookCard({title, description, coverImage, onClick}: any) {
    return (
    <div className={styles.cardWrapper}>
       <img src={coverImage} alt={title} />
 <div className={styles.cardInfo}>
    <h3 className={styles.cardTitle} >{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
 </div> 
    </div>
  )
}

export default BookCard