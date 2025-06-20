import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData } from '../../lib/posts-util';
import { getPostsFiles } from '../../lib/posts-util';
import Head from 'next/head';

export default function ContactPage(props) {
   return (
      <>
         <Head>
            <title>{post.title}</title>
            <meta name="description" content={post.excerpt} />
         </Head>
         <PostContent post={props.post} />;
      </>
   );
}

export function getStaticProps(context) {
   const { params } = context;
   const { slug } = params;

   const postData = getPostData(slug);

   return {
      props: {
         post: postData, // ✅ Pass post data to the component
      },
      revalidate: 600, // 🔄 Optional: Rebuild every 10 minutes
   };
}

export function getStaticPaths() {
   const postFilenames = getPostsFiles();

   const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));

   const paths = slugs.map((slug) => ({
      params: { slug: slug },
   }));

   return {
      paths: paths, // ✅ Pre-render all posts
      fallback: false, // ❌ No fallback; any unknown slug = 404
   };
}
