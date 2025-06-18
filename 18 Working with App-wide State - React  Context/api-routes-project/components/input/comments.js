import { useState } from 'react';
import { useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
   const { eventId } = props;

   const [showComments, setShowComments] = useState(false);
   const [comments, setComments] = useState(second);
   const [isFetchingComments, setIsFetchingComments] = useState(false);

   const notificationCtx = useContext(NotificationContext);

   useEffect(() => {
      if (showComments) {
         setIsFetchingComments(true);

         fetch('/api/comments?eventId=' + eventId)
            .then((response) => response.json())
            .then((data) => {
               setComments(data.comments);
               setIsFetchingComments(false);
            });
      }
   }, [showComments]);

   function toggleCommentsHandler() {
      setShowComments((prevStatus) => !prevStatus);
   }

   async function addCommentHandler(commentData) {
      notificationCtx.showNotification({
         title: 'Sending comment...',
         message: 'Your comment is being stored in our database.',
         status: 'pending',
      });

      try {
         const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(commentData),
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
            message: 'Your comment was saved!',
            status: 'success',
         });

         return data;
      } catch (error) {
         notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error',
         });
         throw error;
      }
   }

   return (
      <section className={classes.comments}>
         <button onClick={toggleCommentsHandler}>
            {showComments ? 'Hide' : 'Show'} Comments
         </button>
         {showComments && <NewComment onAddComment={addCommentHandler} />}
         {showComments && !isFetchingComments && (
            <CommentList items={comments} />
         )}
         {showComments && isFetchingComments && <p>Loading comments...</p>}
      </section>
   );
}

export default Comments;
