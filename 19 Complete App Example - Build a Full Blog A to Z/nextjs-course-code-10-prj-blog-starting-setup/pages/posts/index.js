import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import Head from 'next/head';

function AllPostsPage(props) {
   return (
      <>
         <Head>
            <title>All Posts</title>
            <meta
               name="description"
               content="A list of all programming-related tutorials and posts."
            />
         </Head>
         <AllPosts posts={props.posts} />;
      </>
   );
}

export default AllPostsPage;

export function getStaticProps() {
   const allPosts = getAllPosts();

   return {
      props: {
         posts: allPosts, // Pass all posts to the page
      },
   };
}
