import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

// The authentication configuration object, correctly typed with AuthOptions
export const authOptions: AuthOptions = {
  // The Prisma adapter handles user creation, linking, and sessions automatically.
  // The `as any` cast is a temporary workaround for a known type mismatch issue
  // between some versions of the adapter and next-auth core. This is a safe operation.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // ADDED: pages object to tell next-auth where your login page is
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // The session callback is the key to adding custom data to the session object.
    // The `user` object here comes directly from your database.
    session({ session, user }) {
      if (session.user) {
        // Add the user's ID and your custom fields to the session object
        session.user.id = user.id;
        session.user.firstName = user.firstName;
        session.user.lastName = user.lastName;
      }
      return session;
    },
  },
  // The events callback is a reliable way to handle side-effects, like populating your custom fields.
  events: {
    async createUser({ user }) {
      // When a new user signs up with Google, their name is on the user object.
      if (user.name && user.email) {
        const [firstName, ...lastNameParts] = user.name.split(" ");
        const lastName = lastNameParts.join(" ");

        // Update the user record that was just created by the adapter
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            // Automatically mark Google users' emails as verified
            emailVerified: new Date(),
          },
        });
      }
    },
  },
};

// Initialize NextAuth.js with the options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
