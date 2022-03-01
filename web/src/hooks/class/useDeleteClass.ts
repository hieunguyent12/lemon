import { useMutation } from "@apollo/client";
import { Class, MutationDeleteClassArgs } from "../../graphql/generated";
import { DELETE_CLASS } from "../../graphql/mutations";

export default function useDeleteClass() {
  const [deleteClass, deleteClassResult] = useMutation<
    Class,
    MutationDeleteClassArgs
  >(DELETE_CLASS, {
    update(cache, { data }) {
      const deletedClassId: string = (data as any).deleteClass;

      cache.modify({
        fields: {
          classes(existingClasses = [], { readField }) {
            return existingClasses.filter(
              (classRef: any) => readField("id", classRef) !== deletedClassId
            );
          },
        },
      });
    },
  });

  return {
    deleteClass,
    deleteClassResult,
  };
}
