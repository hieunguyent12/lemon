import { gql, useMutation } from "@apollo/client";
import {
  COMMON_ASSIGNMENT_DETAILS,
  COMMON_CLASS_DETAILS,
} from "../../graphql/fragments";
import { Class, MutationJoinClassArgs } from "../../graphql/generated";
import { JOIN_CLASS } from "../../graphql/mutations";

export default function useJoinClass() {
  const [joinClass, joinClassResult] = useMutation<
    Class,
    MutationJoinClassArgs
  >(JOIN_CLASS, {
    update(cache, { data }) {
      const newClass: Class = (data as any).joinClass;

      cache.modify({
        fields: {
          classes(existingClasses = []) {
            const newClassRef = cache.writeFragment({
              data: newClass,
              fragment: gql`
                ${COMMON_CLASS_DETAILS}
                ${COMMON_ASSIGNMENT_DETAILS}

                fragment NewClass on Class {
                  ...COMMON_CLASS_DETAILS
                  assignments {
                    ...COMMON_ASSIGNMENT_DETAILS
                  }
                }
              `,
              fragmentName: "NewClass",
            });
            return [...existingClasses, newClassRef];
          },
        },
      });
    },
  });

  return {
    joinClass,
    joinClassResult,
  };
}
