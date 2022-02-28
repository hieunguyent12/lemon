import { customAlphabet } from "nanoid";
import { JWT } from "next-auth/jwt";
import { prisma } from "../prisma";
import { Resolvers } from "./generated";

const nanoid = customAlphabet("1234567890abcdef", 7);

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
          enrollmentId: enrollment.id,
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
    async class(_, args, context) {
      const { user } = context;
      const { id } = args;

      if (user.role === "student" && user.sub) {
        const enrollment = await prisma.enrollment.findUnique({
          where: {
            id,
          },
          include: {
            class: {
              include: {
                classes_assignments: {
                  include: {
                    assignment: true,
                  },
                },
              },
            },
          },
        });

        if (enrollment && enrollment.class) {
          return parseClassResponse(enrollment.class);
        } else {
          return null;
        }
      }

      if (user.role === "teacher" && user.sub) {
        const _class = await prisma.class.findUnique({
          where: {
            id,
          },
          include: {
            classes_assignments: {
              include: {
                assignment: true,
              },
            },
          },
        });

        if (_class && _class.teacherID === user.sub) {
          return parseClassResponse(_class);
        } else {
          return null;
        }
      }

      return null;
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
          classCode: nanoid(),
        },
      });
    },

    async editClass(_, args, context) {
      if (context.user.role === "student") return null;

      if (!context.user.sub) return null;

      const { id, name, subject } = args;

      // TODO: Fix authorization, can use updateMany
      return await prisma.class.update({
        where: {
          id,
          // teacherID: context.user.sub,
        },
        data: {
          name,
          subject,
        },
      });
    },

    async deleteClass(_, args, context) {
      if (context.user.role === "student") return null;

      if (!context.user.sub) return null;

      const { id } = args;

      await prisma.class.deleteMany({
        where: {
          id,
          teacherID: context.user.sub,
        },
      });

      return id;
    },

    async joinClass(_, args, context) {
      if (!context.user.sub) return null;

      const { code } = args;

      // create an enrollment
      // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record

      const enrollment = await prisma.enrollment.create({
        data: {
          student: {
            connect: {
              id: context.user.sub,
            },
          },
          class: {
            connect: {
              classCode: code,
            },
          },
        },
        include: {
          class: true,
        },
      });

      return enrollment.class;
    },
  },
};

export default resolvers;
