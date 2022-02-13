import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";

import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";
import ThreeDots from "../../icons/ThreeDots";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getGradeColor } from "../../utils/getGradeColor";
import ListItem from "./ListItem";
import { Input } from "../Input";

export type StudentGradeListItemProps = {
  studentName: string;
  grade: number | null; // null = no grade
};

export const StudentGradeListItem: React.FC<StudentGradeListItemProps> = ({
  studentName,
  grade,
}) => {
  return (
    <ListItem isClickable={false}>
      <TeacherContent studentName={studentName} grade={grade} />
    </ListItem>
  );
};

const TeacherContent: React.FC<StudentGradeListItemProps> = ({
  studentName,
  grade,
}) => {
  const [isEditingGrade, setIsEditingGrade] = useState(false);
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const gradeColor = getGradeColor(grade);

  useOutsideClick(popperRef, () => setShowMenu(false));

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingGrade, inputRef.current]);

  return (
    <>
      <p>{studentName}</p>
      <div className="flex items-center">
        {/* If we are editing grades, show an input to enter new grades */}
        <div className="mr-10">
          {isEditingGrade ? (
            <Input
              ref={inputRef}
              // TODO save grade when the input loses focus
              onBlur={() => setIsEditingGrade(false)}
              size="small"
              className="w-12"
            />
          ) : (
            <div onClick={() => setIsEditingGrade(true)}>
              {grade ? (
                <p className={`${gradeColor}`}>{grade}%</p>
              ) : (
                <p className="text-muted">Enter grade</p>
              )}
            </div>
          )}
        </div>
        <span
          className="hover:bg-gray-300 rounded-md py-1 relative cursor-pointer"
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
              <DropdownMenuItem>Item 1</DropdownMenuItem>
            </DropdownMenu>
          )}
        </span>
      </div>
    </>
  );
};
