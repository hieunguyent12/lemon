import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    isNewUser: boolean;
    userId?: string;
    role: "student" | "teacher";
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    isNewUser: boolean;
    role: "student" | "teacher";
  }
}
