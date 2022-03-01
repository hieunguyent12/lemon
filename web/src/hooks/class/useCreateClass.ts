import { gql, useMutation } from "@apollo/client";
import {
  COMMON_ASSIGNMENT_DETAILS,
  COMMON_CLASS_DETAILS,
} from "../../graphql/fragments";
import { Class, MutationCreateClassArgs } from "../../graphql/generated";
import { CREATE_CLASS } from "../../graphql/mutations";

export default function useGetClasses() {
  const [createClass, createClassResult] = useMutation<
    Class,
    MutationCreateClassArgs
  >(CREATE_CLASS, {
    // update apollo cache after we send a create class mutation
    update(cache, { data }) {
      const newClass: Class = (data as any).createClass;

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

  return { createClass, createClassResult };
}
