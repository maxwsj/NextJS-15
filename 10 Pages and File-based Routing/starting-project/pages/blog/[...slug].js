import { useRouter } from 'next/router';

export default function BlogPostsPage() {
   const router = useRouter();
   const { slug } = router.query;

   console.log(slug);

   return (
      <div>
         <h1>The Blog Posts</h1>
      </div>
   );
}
