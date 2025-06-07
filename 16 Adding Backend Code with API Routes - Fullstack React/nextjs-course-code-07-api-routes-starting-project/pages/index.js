import { useRef, useState } from 'react';

function HomePage() {
   const [feedbackItmes, setFeedbackItmes] = useState([]);

   const emailInputRef = useRef();
   const feedbackInputRef = useRef();

   function submitFormHandler(event) {
      event.preventDefault(); // Prevent page reload

      const enteredEmail = emailInputRef.current.value; // Get email input value
      const enteredFeedback = feedbackInputRef.current.value; //  Get feedback textarea value

      const reqBody = { email: enteredEmail, text: enteredFeedback };

      // Next: Send this data to our API route
      fetch('/api/feedback', {
         method: 'POST',
         body: JSON.stringify(reqBody),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((response) => response.json())
         .then((data) => console.log(data));
   }

   function loadFeedbackHandler() {
      fetch('/api/feedback')
         .then((response) => response.json())
         .then((data) => {
            setFeedbackItmes(data.feedback);
         });
   }

   return (
      <div>
         <h1>The Home Page</h1>
         <form onSubmit={submitFormHandler}>
            <div>
               <label htmlFor="email">Your Email Address</label>
               <input type="email" id="email" ref={emailInputRef} />
            </div>
            <div>
               <label htmlFor="feedback">Your Feedback</label>
               <textarea
                  id="feedback"
                  rows="5"
                  ref={feedbackInputRef}
               ></textarea>
            </div>
            <button>Feedback</button>
         </form>
         <hr />
         <button onClick={loadFeedbackHandler}>Load Feeback</button>
         <ul>
            {feedbackItmes.map((item) => (
               <li key={item.id}>{item.text}</li>
            ))}
         </ul>
      </div>
   );
}

export default HomePage;
