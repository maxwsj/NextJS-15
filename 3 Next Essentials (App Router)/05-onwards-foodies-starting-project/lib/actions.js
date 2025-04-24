'use server';

import { saveMeal } from '@/lib/meals';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function isInvalidText(text) {
   return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
   const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
   };

   if (
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') || //  Email must have @
      !image ||
      image.size === 0 //  Image must be present and not empty
   ) {
      return {
         message: 'Invalid input.',
      };
   }

   await saveMeal(meal); // runs in server terminal
   revalidatePath('/meals');

   // Redirect after success
   redirect('/meals');
}
