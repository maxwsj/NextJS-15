import { useRef, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
   const emailInputRef = useRef();
   const notificationCtx = useContext(NotificationContext);

   async function registrationHandler(event) {
      event.preventDefault();

      const enteredEmail = emailInputRef.current.value;

      notificationCtx.showNotification({
         title: 'Signing up...',
         message: 'Registering for newsletter.',
         status: 'pending',
      });

      try {
         const response = await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
               'Content-Type': 'application/json',
            },
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
         }

         notificationCtx.showNotification({
            title: 'Success!',
            message: 'Successfully registered for newsletter!',
            status: 'success',
         });
      } catch (error) {
         notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
         });
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
