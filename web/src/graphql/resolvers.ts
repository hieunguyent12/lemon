import { prisma } from "../prisma";
import { Resolvers } from "./generated";

const resolvers: Resolvers = {
  Query: {
    user(parent, args, context) {
      return {
        id: "hi",
      };
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
