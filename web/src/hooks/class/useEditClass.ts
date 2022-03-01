import { gql, useMutation } from "@apollo/client";
import { Class, MutationEditClassArgs } from "../../graphql/generated";
import { EDIT_CLASS } from "../../graphql/mutations";

export default function useEditClass() {
  const [editClass, editClassResult] = useMutation<
    Class,
    MutationEditClassArgs
  >(EDIT_CLASS, {
    update(cache, { data }) {
      const updatedClass: Class = (data as any).editClass;

      cache.updateFragment(
        {
          id: cache.identify(updatedClass),
          fragment: gql`
            fragment UpdatedClass on Class {
              id
              name
              subject
            }
          `,
        },
        (data) => ({
          ...data,
          name: updatedClass.name,
          subject: updatedClass.subject,
        })
      );
    },
  });

  return { editClass, editClassResult };
}
