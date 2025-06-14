import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
   const emailInputRef = useRef();

   async function registrationHandler(event) {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;

      try {
         const response = await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();
         console.log(data); // 💬 Expect { message: 'Signed up!' }
      } catch (error) {
         console.error('Something went wrong:', error);
      }
   }

   return (
      <section className={classes.newsletter}>
         <h2>Sign up to stay updated!</h2>
         <form onSubmit={registrationHandler}>
            <div className={classes.control}>
               <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  ref={emailInputRef}
                  required
               />
               <button>Register</button>
            </div>
         </form>
      </section>
   );
}

export default NewsletterRegistration;
