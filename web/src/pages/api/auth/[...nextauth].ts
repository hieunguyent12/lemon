import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../prisma";

const jwt_secret = process.env.JWT_SECRET;

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account, isNewUser }) {
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
        token.role = user.isTeacher ? "teacher" : "student";
      }

      return token;
    },
    async session({ session, token }) {
      session.isNewUser = token.isNewUser;
      session.userId = token.sub;
      session.role = token.role;
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
  secret: jwt_secret,
});
