import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
   const events = getAllEvents();
   const router = useRouter();

   function findEventsHandler(year, month) {
      const fullPath = `/events/${year}/${month}`;

      router.push(fullPath);
   }

   return (
      <>
         <EventsSearch onSearch={findEventsHandler} />
         <EventList events={events} />
      </>
   );
}

export default AllEventsPage;
