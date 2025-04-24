import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export async function getMeals() {
   await new Promise((resolve) => setTimeout(resolve, 2000));
   return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
   // Generate slug from the title
   meal.slug = slugify(meal.title, { lower: true });

   // Sanitize user-generated instructions to avoid XSS attacks
   meal.instructions = xss(meal.instructions);

   // Get the image extension
   const extension = meal.image.name.split('.').pop();

   // Create a unique filename using the slug
   const fileName = `${meal.slug}.${extension}`;

   // Write the image file to the /public/images folder
   const stream = fs.createWriteStream(`public/images/${fileName}`);
   const bufferedImage = await meal.image.arrayBuffer();

   stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
         throw new Error('Saving image failed!');
      }
   });

   // Save image path instead of actual file in DB
   meal.image = `/images/${fileName}`; //  No `/public` in the path!

   // Save meal data to the database using better-sqlite3
   const stmt = db.prepare(`
     INSERT INTO meals (
       title, summary, instructions,
       creator, creator_email, image, slug
     )
     VALUES (
       @title, @summary, @instructions,
       @creator, @creator_email, @image, @slug
     )
   `);
   stmt.run(meal);
}
