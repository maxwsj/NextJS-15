import {
   connectDatabase,
   insertDocument,
   getAllDocuments,
} from '../../../helpers/db-util';

export default async function handler(req, res) {
   const eventId = req.query.eventId; // Extract dynamic segment from URL

   try {
      client = connectDatabase();
   } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
      return;
   }

   if (req.method === 'POST') {
      const { email, name, text } = req.body; // Destructure incoming data

      // ✅ Basic server-side validation
      if (
         !email.includes('@') ||
         !name ||
         name.trim() === '' ||
         !text ||
         text.trim() === ''
      ) {
         res.status(422).json({ message: 'Invalid input.' });
         client?.close();
         return;
      }

      // Create dummy comment object
      const newComment = {
         email,
         name,
         text,
         eventId,
      };

      let result;

      try {
         result = await insertDocument(client, 'comments', newComment);
         newComment._id = result.insertedId;
         res.status(201).json({ message: 'Added comment.', comment: result });
      } catch (error) {
         res.status(500).json({ message: 'Inserting comments failed.' });
      }
   }

   if (req.method === 'GET') {
      try {
         const documents = await getAllDocuments(client, 'comments', {
            _id: -1,
         });
      } catch (error) {
         res.status(500).json({ message: 'Getting comments failed.' });
      }
   }
   client?.close();
}
