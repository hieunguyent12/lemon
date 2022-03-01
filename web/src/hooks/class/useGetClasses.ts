import { useQuery } from "@apollo/client";
import { Query } from "../../graphql/generated";
import { GET_CLASSES } from "../../graphql/queries";

export default function useGetClasses() {
  const { data, error, loading } = useQuery<Query>(GET_CLASSES);

  return {
    classes: data?.classes,
    error,
    loading,
  };
}
