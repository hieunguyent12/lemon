import { JWT } from "next-auth/jwt";
import { prisma } from "../prisma";
import { Resolvers } from "./generated";

type Context = {
  user: JWT;
};

const resolvers: Resolvers<Context> = {
  Query: {
    user(_, args) {
      return {
        id: "hi",
      };
    },
    async classes(_, args, context) {
      const { user } = context;

      if (user.role === "student") {
        // check in enrollments
        const enrollments = await prisma.enrollment.findMany({
          where: {
            studentID: user.sub,
          },
          include: {
            class: true,
          },
        });
        return enrollments.map((enrollment) => ({
          ...enrollment.class,
        }));
      } else {
        // just check for classes
        return await prisma.class.findMany({
          where: {
            teacherID: user.sub,
          },
        });
      }
    },
  },
  Mutation: {
    async updateUser(_, args) {
      const { userId, name, role } = args;

      let isTeacher = role === "teacher";

      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileName: name,
          isTeacher,
          isNewUser: false,
        },
      });
    },
    async createClass(_, args, context) {
      if (context.user.role === "student") return null;

      if (!context.user.sub) return null;

      const { name, subject = null } = args;

      return await prisma.class.create({
        data: {
          name,
          subject,
          teacherID: context.user.sub,
        },
      });
    },
  },
};

export default resolvers;
