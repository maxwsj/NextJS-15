import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
   return (
      <section className={classes.hero}>
         <div className={classes.image}>
            <Image
               src="/images/site/max.png" // Image from public folder
               alt="An image showing Max"
               width={300} // Optimal width for the image
               height={300} // Optimal height for the image
            />
         </div>
         <h1>Hi, I'm Max</h1>
         <p>
            I blog about web development - especially frontend frameworks like
            React and Angular.
         </p>
      </section>
   );
}
