import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BlogCard.module.css'

export default function BlogCard({author, title, slug, featuredImage, featuredImageAlt, excerpt, datePublished}) {
  // format date and time
  let formatDate = new Date(datePublished);
  let dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  let date = formatDate.toLocaleDateString('en-US', dateOptions);

  return(
    <div className={styles.card}>
      <Link href={'/posts/' + slug}>
        <div className={styles.imgContainer}>
          <span className='absolute overflow-hidden top-0 left-0 bottom-0 right-0'>
            <img src={featuredImage.url} alt={featuredImageAlt} className='w-full max-h-full' />
          </span>
        </div>

        <div className={styles.text}>
          <h2>{title}</h2>
          <p>{excerpt}</p>
          <div className={styles.details}>
            <div className={styles.author}>
              <img src={author.avatar.url} alt={author.avatarAlt} />
              <h3>{author.name}</h3>
            </div>

            <div>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}