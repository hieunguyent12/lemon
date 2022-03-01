import { gql } from "@apollo/client";
import { COMMON_ASSIGNMENT_DETAILS, COMMON_CLASS_DETAILS } from "./fragments";

export const CREATE_CLASS = gql`
  ${COMMON_CLASS_DETAILS}
  ${COMMON_ASSIGNMENT_DETAILS}
  mutation createClass($name: String!, $subject: String) {
    createClass(name: $name, subject: $subject) {
      ...COMMON_CLASS_DETAILS

      assignments {
        ...COMMON_ASSIGNMENT_DETAILS
      }
    }
  }
`;

export const EDIT_CLASS = gql`
  ${COMMON_CLASS_DETAILS}
  mutation editClass($id: String!, $name: String!, $subject: String) {
    editClass(id: $id, name: $name, subject: $subject) {
      ...COMMON_CLASS_DETAILS
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation deleteClass($id: String!) {
    deleteClass(id: $id)
  }
`;

export const JOIN_CLASS = gql`
  ${COMMON_CLASS_DETAILS}
  mutation joinClass($code: String!) {
    joinClass(code: $code) {
      ...COMMON_CLASS_DETAILS
    }
  }
`;
