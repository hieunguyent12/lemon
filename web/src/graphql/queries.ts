import { gql } from "@apollo/client";
import { COMMON_ASSIGNMENT_DETAILS, COMMON_CLASS_DETAILS } from "./fragments";

// get all classes
export const GET_CLASSES = gql`
  ${COMMON_CLASS_DETAILS}
  ${COMMON_ASSIGNMENT_DETAILS}
  query Classes {
    classes {
      ...COMMON_CLASS_DETAILS
      assignments {
        ...COMMON_ASSIGNMENT_DETAILS
      }
    }
  }
`;

// get a single class
export const GET_CLASS = gql`
  ${COMMON_CLASS_DETAILS}
  ${COMMON_ASSIGNMENT_DETAILS}
  query getClass($id: String!) {
    class(id: $id) {
      ...COMMON_CLASS_DETAILS
      assignments {
        ...COMMON_ASSIGNMENT_DETAILS
      }
    }
  }
`;
