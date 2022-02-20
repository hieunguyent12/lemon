import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account, isNewUser }) {
      // TODO check database to check for isNewUser

      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (user) {
        if (user.isNewUser === null) {
          token.isNewUser = true;
        } else {
          token.isNewUser = false;
        }
      }
      // if (isNewUser) {
      //   token.isNewUser = true;
      // } else if (typeof isNewUser === "boolean" && !isNewUser) {
      //   // TODO change this later because during the process of supplying info, the user could close the tab
      //   // when that happens and the user signs in again we have to ask the db to check if they have supplied those info or not
      //   token.isNewUser = false;
      // }

      return token;
    },
    async session({ session, token }) {
      session.isNewUser = token.isNewUser;
      session.userId = token.sub;
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "HIIHIHIHIHI",
});
