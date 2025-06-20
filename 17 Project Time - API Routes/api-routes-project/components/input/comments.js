import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
   const { eventId } = props;

   const [showComments, setShowComments] = useState(false);
   const [comments, setComments] = useState(second);

   useEffect(() => {
      if (showComments) {
         fetch(`/api/comments/${eventId}`)
            .then((res) => res.json())
            .then((data) => {
               setComments(data.comments); // ✅ Set state with fetched comments
            });
      }
   }, [showComments]);

   function toggleCommentsHandler() {
      setShowComments((prevStatus) => !prevStatus);
   }

   function addCommentHandler(commentData) {
      // Send POST request
      fetch(`/api/comments/${eventId}`, {
         method: 'POST',
         body: JSON.stringify({ email, name, text }),
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => res.json())
         .then((data) => console.log(data)); //  Log server response
   }

   return (
      <section className={classes.comments}>
         <button onClick={toggleCommentsHandler}>
            {showComments ? 'Hide' : 'Show'} Comments
         </button>
         {showComments && <NewComment onAddComment={addCommentHandler} />}
         {showComments && <CommentList items={comments} />}
      </section>
   );
}

export default Comments;
