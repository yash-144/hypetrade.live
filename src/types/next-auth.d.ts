import { DefaultSession, DefaultUser } from "next-auth";

// This file extends the default types from next-auth
// to include the custom fields you've added to your User model in Prisma.

declare module "next-auth" {
  /**
   * The shape of the user object returned by the Prisma adapter.
   * It includes your custom fields.
   */
  interface User extends DefaultUser {
    firstName: string | null;
    lastName: string | null;
  }

  /**
   * The shape of the session object returned to the client.
   * We add the `id` and your other custom fields to the user object here.
   */
  interface Session {
    user: {
      id: string; // Add the user id to the session
      firstName: string | null;
      lastName: string | null;
    } & DefaultSession["user"]; // Keep the default properties like name, email, image
  }
}
