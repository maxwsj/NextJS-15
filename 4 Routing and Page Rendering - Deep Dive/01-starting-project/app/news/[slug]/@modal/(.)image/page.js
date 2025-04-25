import { DUMMY_NEWS } from '@/dummy-news';
import { notFound } from 'next/navigation';

export default function InterceptedImagePage({ params }) {
   const newsItemSlug = params.slug;
   const newsItem = DUMMY_NEWS.find(
      (newsItem) => newsItem.slug === newsItemSlug
   );

   if (!newsItem) {
      notFound(); // This invokes the appropriate not-found.js component
   }

   return (
      <>
         <div className="modal-backdrop" />
         <dialog className="modal" open>
            <div className="fullscreen-image">
               <img
                  src={`/images/news/${newsItem.image}`}
                  alt={newsItem.title}
               />
            </div>
         </dialog>
      </>
   );
}
