import { prisma } from "../prisma";

const resolvers = {
  Query: {
    users(parent: any, args: any, context: any) {
      return prisma.user.findMany();
    },
  },
};

export default resolvers;
