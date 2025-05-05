import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';

import db from './db';

const adapter = new BetterSqlite3Adapter(db, {
   user: 'users',
   session: 'sessions',
});

const lucia = new Lucia(adapter, {
   sessionCookie: {
      expires: false,
      attributes: {
         secure: process.env.NODE_ENV === 'production',
      },
   },
});

export async function createAuthSession(userId) {
   const session = await lucia.createSession(userId, {});
   const sessionCookie = lucia.createSessionCookie(session.id);
   cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
   );
}

export const verifyAuth = async () => {
   const cookieStore = await cookies();
   const sessionCookie = cookieStore.get(lucia.sessionCookieName);

   if (!sessionCookie || !sessionCookie.value) {
      return { user: null, session: null };
   }

   const sessionId = sessionCookie.value;
   const result = await lucia.validateSession(sessionId);

   try {
      if (result.session && result.session.fresh) {
         const sessionCookieData = lucia.createSessionCookie(result.session.id);
         cookieStore.set(
            sessionCookieData.name,
            sessionCookieData.value,
            sessionCookieData.attributes
         );
      }

      if (!result.session) {
         const blankCookie = lucia.createBlankSessionCookie();
         cookieStore.set(
            blankCookie.name,
            blankCookie.value,
            blankCookie.attributes
         );
      }
   } catch {}

   return result;
};

export async function destroySession() {
   const { session } = await verifyAuth();

   if (!session) {
      return { error: 'Unauthorized' };
   }

   await lucia.invalidateSession(session.id);

   const sessionCookie = lucia.createBlankSessionCookie();
   cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
   );
}
