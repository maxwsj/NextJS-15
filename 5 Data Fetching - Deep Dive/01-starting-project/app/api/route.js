export async function GET() {
   const data = { message: 'Hello JSON' };

   return Response.json(data); // Sends JSON response
}
