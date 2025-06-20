import Link from 'next/link';
import Image from 'next/image';
import classes from './post-item.module.css';

function PostItem({ post }) {
   // Destructure the incoming props
   const { title, image, excerpt, date, slug } = post;

   // Format the date for readability
   const formattedDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   // Construct the image path dynamically
   const imagePath = `/images/posts/${slug}/${image}`;

   // Create the link path to the individual post
   const linkPath = `/posts/${slug}`;

   return (
      <li className={classes.post}>
         <Link href={linkPath} legacyBehavior>
            <a>
               <div className={classes.image}>
                  <Image
                     src={imagePath}
                     alt={title}
                     width={300}
                     height={200}
                     layout="responsive"
                  />
               </div>
               <div className={classes.content}>
                  <h3>{title}</h3>
                  <time>{formattedDate}</time>
                  <p>{excerpt}</p>
               </div>
            </a>
         </Link>
      </li>
   );
}

export default PostItem;
