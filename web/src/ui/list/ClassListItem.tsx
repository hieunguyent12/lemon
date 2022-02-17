import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";
import getOrdinalSuffix from "../../utils/ordinal_suffix";
import ThreeDots from "../../icons/ThreeDots";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getGradeColor } from "../../utils/getGradeColor";
import ListItem from "./ListItem";
import getLetterGrade from "../../utils/getLetterGrade";

export type ClassListItemProps = {
  isTeacher: boolean;
  _className: string;
  period: number;
  studentCount?: number;
  grade?: number;
  roomNumber?: number;
  teacherName?: string;
};

export const ClassListItem: React.FC<ClassListItemProps> = ({
  isTeacher,
  _className,
  period,
  roomNumber,
  studentCount,
  grade,
  teacherName,
}) => {
  return (
    <ListItem>
      {isTeacher ? (
        <TeacherContent
          _className={_className}
          studentCount={studentCount}
          period={period}
          roomNumber={roomNumber}
        />
      ) : (
        <StudentContent
          _className={_className}
          period={period}
          roomNumber={roomNumber}
          grade={grade}
          teacherName={teacherName}
        />
      )}
    </ListItem>
  );
};

const TeacherContent: React.FC<
  Omit<ClassListItemProps, "grade" | "isTeacher">
> = ({ _className, period, studentCount, roomNumber }) => {
  const [showMenu, setShowMenu] = useState(false);
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
      <div className="w-48">
        <p>{_className}</p>
      </div>
      <div className="flex items-center justify-evenly w-96">
        <p className="text-muted text-sm">{getOrdinalSuffix(period)} period</p>
        <p className="text-muted text-sm">{studentCount} students</p>
        <p className="text-muted text-sm">Room {roomNumber}</p>
      </div>

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

const StudentContent: React.FC<
  Omit<ClassListItemProps, "studentCount" | "isTeacher">
> = ({ _className, period, roomNumber, grade, teacherName }) => {
  const gradeColor = getGradeColor(grade);
  const letterGrade = getLetterGrade(grade);

  return (
    <>
      <div>
        <p className="">{_className}</p>
        <span className="text-sm text-muted">{teacherName}</span>
      </div>
      <p className={`${gradeColor}`}>
        {grade}% {letterGrade}
      </p>
      <p className="text-muted text-sm">{getOrdinalSuffix(period)} period</p>
      <p className="text-muted text-sm">Room {roomNumber}</p>
    </>
  );
};
