import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // TODO: Save user to database
      const db = new PrismaClient();
      const dbUser = await db.user.upsert({
        where: { email: user.email! },
        create: {
          email: user.email!,
          name: user.name,
        },
        update: {}
      });

      if (dbUser.registered) {
        return true;
      }

      return "/setusername";
    }
  }
});