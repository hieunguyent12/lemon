import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { DropdownMenu, DropdownMenuItem } from "./DropdownMenu";
import getOrdinalSuffix from "../utils/ordinal_suffix";
import ThreeDots from "../icons/ThreeDots";
import { useOutsideClick } from "../hooks/useOutsideAlert";

const GRADE_COLORS = {
  100: "text-primary-600",
  90: "text-primary-600",
  80: "text-lime-500",
  70: "text-yellow-500",
  60: "text-yellow-600",
  50: "text-orange-500",
};

export type ListItemProps = {
  isTeacher: boolean;
  _className: string;
  period: number;
  studentCount?: number;
  grade?: number;
  roomNumber?: number;
  teacherName?: string;
};

export const ListItem: React.FC<ListItemProps> = ({
  isTeacher,
  _className,
  period,
  roomNumber,
  studentCount,
  grade,
  teacherName,
}) => {
  return (
    <div className="flex justify-between items-center h-14 border border-gray-100 p-3 rounded-md max-w-lg	cursor-pointer select-none transition duration-200 ease-in-out hover:bg-gray-100">
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
    </div>
  );
};

const TeacherContent: React.FC<Omit<ListItemProps, "grade" | "isTeacher">> = ({
  _className,
  period,
  studentCount,
  roomNumber,
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

  useOutsideClick(popperRef, () => setShowMenu(false));

  return (
    <>
      <p>{_className}</p>
      <p className="text-gray-400">{getOrdinalSuffix(period)} period</p>
      <p className="text-gray-400">{studentCount} students</p>
      <p className="text-gray-400">Room {roomNumber}</p>
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
  Omit<ListItemProps, "studentCount" | "isTeacher">
> = ({ _className, period, roomNumber, grade, teacherName }) => {
  const gradeColor = getGradeColor(grade);
  const letterGrade = getLetterGrade(grade);

  return (
    <>
      <div>
        <p className="">{_className}</p>
        <span className="text-sm text-gray-400">{teacherName}</span>
      </div>
      <p className={`${gradeColor}`}>
        {grade}% {letterGrade}
      </p>
      <p className="text-gray-400">{getOrdinalSuffix(period)} period</p>
      <p className="text-gray-400">Room {roomNumber}</p>
    </>
  );
};

function getGradeColor(grade: number | undefined) {
  if (!grade) {
    return null;
  }

  if (grade < 50) {
    return GRADE_COLORS[50];
  } else {
    return GRADE_COLORS[
      (Math.floor((grade as any) / 10) * 10) as keyof typeof GRADE_COLORS
    ];
  }
}

function getLetterGrade(grade: number | undefined) {
  if (!grade) {
    return "Unknown grade";
  }

  if (grade >= 90) {
    return "A";
  } else if (grade < 90 && grade >= 80) {
    return "B";
  } else if (grade < 80 && grade >= 70) {
    return "C";
  } else if (grade < 70 && grade >= 60) {
    return "D";
  } else {
    return "F";
  }
}
