// 📦 Import necessary utilities from Next
import { NextResponse } from 'next/server';

// 🧠 Special reserved function name
export function middleware(request) {
   console.log('Middleware request:', request);

   // ➡️ Continue to the requested page
   return NextResponse.next();
}

export const config = {
   matcher: ['/news'],
};
