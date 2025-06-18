import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
   notification: null, // Default: no notification
   showNotification: (notificationData) => {}, //  Placeholder function
   hideNotification: () => {}, //  Placeholder function
});

export function NotificationContextProvider(props) {
   const [activeNotification, setActiveNotification] = useState();

   useEffect(() => {
      if (
         activeNotification &&
         (activeNotification.status === 'success' ||
            activeNotification.status === 'error')
      ) {
         const timer = setTimeout(() => {
            setActiveNotification(null); //  Or call hideNotificationHandler()
         }, 3000); //  3 seconds

         return () => {
            clearTimeout(timer); //  Clean up if notification changes before timer ends
         };
      }
   }, [activeNotification]);

   function showNotificationHandler(notificationData) {
      setActiveNotification(notificationData);
   }

   function hideNotificationHandler() {
      setActiveNotification(null);
   }

   const context = {
      notification: activeNotification,
      showNotification: showNotificationHandler,
      hideNotification: hideNotificationHandler,
   };

   return (
      <NotificationContext.Provider value={context}>
         {props.children}
      </NotificationContext.Provider>
   );
}

export default NotificationContext;
