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
        return prisma.class.findMany({
          where: {
            teacherID: user.sub,
          },
        });
      }
    },
  },
  Mutation: {
    updateUser(_, args) {
      const { userId, name, role } = args;

      let isTeacher = role === "teacher";

      return prisma.user.update({
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
  },
};

export default resolvers;
