import { notFound } from 'next/navigation';

export default async function ImagePage({ params }) {
   const newsItemSlug = params.slug;
   const newsItem = await getNewsItem(newsItemSlug);

   if (!newsItem) {
      notFound(); // This invokes the appropriate not-found.js component
   }
   return (
      <div className="fullscreen-image">
         <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
      </div>
   );
}
