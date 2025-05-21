import EventItem from './event-item';

import classes from './event-list.module.css';

export default function EventList({ events }) {
   return (
      <ul className={classes.list}>
         {events.map((event) => (
            <EventItem
               key={event.id}
               id={event.id}
               location={event.location}
               title={event.title}
               date={event.date}
               image={event.image}
            />
         ))}
      </ul>
   );
}
