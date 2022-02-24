import { JWT } from "next-auth/jwt";
import { Resolvers } from "./generated";

function parseClassResponse(_class: any) {
  const newClass = {
    ..._class,
    assignments: _class.classes_assignments,
  };

  delete newClass.classes_assignments;

  newClass.assignments = newClass.assignments.map(
    ({ assignment, ...others }: any) => ({
      ...others,
      name: assignment.name,
      teacherID: assignment.teacherID,
    })
  );

  return newClass;
}

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
      return null;
    },
    async class(_, args, context) {
      return null;
    },
  },
  Mutation: {
    async updateUser(_, args) {
      return null;
    },
    async createClass(_, args, context) {
      return null;
    },
  },
};

export default resolvers;
