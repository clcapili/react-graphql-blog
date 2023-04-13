import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BlogCard.module.scss'

export default function BlogCard({title, slug, author, featuredImage, datePublished}) {
  return(
    <div className={styles.card}>
      <Link href={'/posts/' + slug}>
        <div className={styles.imgContainer}>
          <img src={featuredImage.url} alt='' />
        </div>
      </Link>

      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avatar.url} alt='' />
            <h3>{author.name}</h3>
          </div>

          <div className={styles.date}>
            <h3 className='font-poppins'>{datePublished}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}