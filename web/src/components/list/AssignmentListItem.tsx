import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";
import ThreeDots from "../../icons/ThreeDots";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getGradeColor } from "../../utils/getGradeColor";
import ListItem from "./ListItem";

export type AssignmentListItemProps = {
  isTeacher: boolean;
  assignmentName: string;
  grade?: number | null; // null = not graded
  dueDate?: string;
};

export const AssignmentListItem: React.FC<AssignmentListItemProps> = ({
  isTeacher,
  assignmentName,
  grade,
  dueDate,
}) => {
  return (
    <ListItem>
      {isTeacher ? (
        <TeacherContent assignmentName={assignmentName} dueDate={dueDate} />
      ) : (
        <StudentContent
          assignmentName={assignmentName}
          dueDate={dueDate}
          grade={grade}
        />
      )}
    </ListItem>
  );
};

const TeacherContent: React.FC<
  Omit<AssignmentListItemProps, "grade" | "isTeacher">
> = ({ assignmentName, dueDate }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 5],
        },
      },
    ],
  });
  const popperRef = useRef<any>();

  useOutsideClick(popperRef, () => setShowMenu(false));

  return (
    <>
      <p>{assignmentName}</p>
      <span
        className="hover:bg-gray-300 rounded-md py-1 relative"
        ref={(ref) => {
          setReferenceElement(ref);
          popperRef.current = ref;
        }}
        onClick={() => setShowMenu(!showMenu)}
      >
        <ThreeDots />

        {showMenu && (
          <DropdownMenu
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenu>
        )}
      </span>
    </>
  );
};

const StudentContent: React.FC<Omit<AssignmentListItemProps, "isTeacher">> = ({
  assignmentName,
  grade,
  dueDate,
}) => {
  const gradeColor = getGradeColor(grade);
  // const letterGrade = getLetterGrade(grade);

  return (
    <>
      <div>
        <p className="">{assignmentName}</p>
      </div>
      <span>
        <span className={`${gradeColor}`}>{grade}</span>
        <span>/100</span>
      </span>
    </>
  );
};
