import { gql } from "@apollo/client";

export const COMMON_CLASS_DETAILS = gql`
  fragment COMMON_CLASS_DETAILS on Class {
    id
    name
    subject
    classCode
    enrollmentId
  }
`;

export const COMMON_ASSIGNMENT_DETAILS = gql`
  fragment COMMON_ASSIGNMENT_DETAILS on Assignment {
    id
    assignmentID
    name
    teacherID
    classID
  }
`;
