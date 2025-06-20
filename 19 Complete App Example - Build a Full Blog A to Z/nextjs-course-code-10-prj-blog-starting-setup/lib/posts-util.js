import fs from 'fs'; // Node.js File System API
import path from 'path'; // For handling file paths
import matter from 'gray-matter'; // Parses markdown frontmatter

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
   return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
   const postSlug = postIdentifier.replace(/\.md$/, ''); // Remove ".md" from filename

   const filePath = path.join(postsDirectory, `${postSlug}.md`); // Full file path

   const fileContent = fs.readFileSync(filePath, 'utf-8'); // Read file content

   const { data, content } = matter(fileContent); // Parse frontmatter & content

   const postData = {
      slug: postSlug, // Slug for URL
      ...data, // Metadata (title, date, image, excerpt, isFeatured)
      content, // Markdown content
   };

   return postData;
}

export function getAllPosts() {
   const postFiles = getPostsFiles(); // Read all file names in /posts

   const allPosts = postFiles.map((fileName) => getPostData(fileName)); // Map each file to postData

   const sortedPosts = allPosts.sort(
      (postA, postB) => (postA.date > postB.date ? -1 : 1) // Sort by date descending (newest first)
   );

   return sortedPosts;
}

export function getFeaturedPosts() {
   const allPosts = getAllPosts();

   const featuredPosts = allPosts.filter((post) => post.isFeatured); // Filter only featured posts

   return featuredPosts;
}
