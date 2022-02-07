import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";
import ThreeDots from "../../icons/ThreeDots";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getGradeColor } from "../../utils/getGradeColor";
import ListItem from "./ListItem";

export type StudentListItemProps = {
  studentName: string;
  grade: number | null; // null = no grade
  email: string;
};

export const StudentListItem: React.FC<StudentListItemProps> = ({
  studentName,
  grade,
  email,
}) => {
  return (
    <ListItem>
      <TeacherContent studentName={studentName} grade={grade} email={email} />
    </ListItem>
  );
};

const TeacherContent: React.FC<StudentListItemProps> = ({
  studentName,
  grade,
  email,
}) => {
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
  const gradeColor = getGradeColor(grade);

  useOutsideClick(popperRef, () => setShowMenu(false));

  return (
    <>
      <p>{studentName}</p>
      <p className={`${gradeColor}`}>{grade}%</p>
      <p className="text-muted">{email}</p>
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
            <DropdownMenuItem>Remove</DropdownMenuItem>
          </DropdownMenu>
        )}
      </span>
    </>
  );
};
