import { useRouter } from "next/router";
import { DotsHorizontalIcon } from "@modulz/radix-icons";

import { Class, Maybe, Query } from "../../graphql/generated";
import NavbarItem from "../NavbarItem";
import { useEffect, useState } from "react";

type Props = {
  classes: Query["classes"];
  role: "student" | "teacher";
  hideBurgerMenu: () => void;
};

const ClassList: React.FC<Props> = ({ classes, role, hideBurgerMenu }) => {
  const router = useRouter();

  const isTeacher = role === "teacher";

  const onItemClick = (classItem: Maybe<Class>) => {
    if (!classItem) return;

    router.push(`/class/${isTeacher ? classItem.id : classItem.enrollmentId}`);
    hideBurgerMenu();
  };

  if (!classes) return null;

  return (
    <div>
      {classes.map((classItem) =>
        classItem ? (
          <NavbarItem
            key={classItem.id}
            onClick={() => onItemClick(classItem)}
            isSelected={router.query.id === classItem.id}
            rightIcon={<DotsHorizontalIcon />}
            hasMenu
          >
            {classItem.name}
          </NavbarItem>
        ) : null
      )}
    </div>
  );
};
export default ClassList;
