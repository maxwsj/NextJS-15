// components/ui/Notification.js
import ReactDOM from 'react-dom';
import classes from './notification.module.css';

function Notification(props) {
   const { title, message, status } = props;

   let statusClasses = '';

   if (status === 'success') {
      statusClasses = classes.success;
   }
   if (status === 'error') {
      statusClasses = classes.error;
   }
   if (status === 'pending') {
      statusClasses = classes.pending;
   }

   const cssClasses = `${classes.notification} ${statusClasses}`;

   const notification = (
      <div className={cssClasses}>
         <h2>{title}</h2>
         <p>{message}</p>
      </div>
   );

   // Create portal and render to #notifications div
   return ReactDOM.createPortal(
      notification,
      document.getElementById('notifications')
   );
}

export default Notification;
