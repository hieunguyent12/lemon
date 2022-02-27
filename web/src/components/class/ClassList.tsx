import { useRouter } from "next/router";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@modulz/radix-icons";
import { Modal } from "@mantine/core";

import { Class, Maybe, Query } from "../../graphql/generated";
import ClassListItem from "./ClassListItem";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "../menu/DropdownMenu";

type Props = {
  classes: Query["classes"];
  role: "student" | "teacher";
  hideBurgerMenu: () => void;
  onOpenEditModal: (_class: Class) => void;
};

const ClassList: React.FC<Props> = ({
  classes,
  role,
  hideBurgerMenu,
  onOpenEditModal,
}) => {
  const router = useRouter();

  const isTeacher = role === "teacher";

  const onItemClick = (classItem: Maybe<Class>) => {
    if (!classItem) return;

    router.push(`/class/${isTeacher ? classItem.id : classItem.enrollmentId}`);
    hideBurgerMenu();
  };

  const onDeleteClass = () => {
    console.log("delete");
  };

  if (!classes) return null;

  return (
    <div>
      {classes.map((classItem) =>
        classItem ? (
          <ClassListItem
            key={classItem.id}
            onClick={() => onItemClick(classItem)}
            isSelected={router.query.id === classItem.id}
            rightIcon={<DotsHorizontalIcon />}
            menuContent={
              <>
                <DropdownMenuItem
                  onClick={() => onOpenEditModal(classItem)}
                  icon={<Pencil2Icon />}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteClass()}
                  icon={<TrashIcon />}
                >
                  Delete
                </DropdownMenuItem>
              </>
            }
            hasMenu
          >
            {classItem.name}
          </ClassListItem>
        ) : null
      )}
    </div>
  );
};
export default ClassList;
