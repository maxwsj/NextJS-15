import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';

import { notFound } from 'next/navigation';

export default async function InterceptedImagePage({ params }) {
   const newsItemSlug = params.slug;
   const newsItem = await getNewsItem(newsItemSlug);

   if (!newsItem) {
      notFound(); // This invokes the appropriate not-found.js component
   }

   return (
      <>
         <ModalBackdrop />
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
