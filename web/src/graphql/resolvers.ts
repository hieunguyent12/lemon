const resolvers = {
  Query: {
    users(parent: any, args: any, context: any) {
      return [{ name: "Next js" }];
    },
  },
};

export default resolvers;
