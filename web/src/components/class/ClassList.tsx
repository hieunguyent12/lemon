import { useRouter } from "next/router";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@modulz/radix-icons";

import { Class, Maybe, Query } from "../../graphql/generated";
import ClassListItem from "./ClassListItem";
import { DropdownMenuItem } from "../menu/DropdownMenu";

type Props = {
  classes: Query["classes"];
  role: "student" | "teacher";
  hideBurgerMenu: () => void;
  onOpenEditModal: (_class: Maybe<Class>) => void;
  deleteClass: (id: string | undefined) => void;
};

const ClassList: React.FC<Props> = ({
  classes,
  role,
  hideBurgerMenu,
  onOpenEditModal,
  deleteClass,
}) => {
  const router = useRouter();

  const isTeacher = role === "teacher";

  const onItemClick = (classItem: Maybe<Class>) => {
    if (!classItem) return;

    router.push(`/class/${isTeacher ? classItem.id : classItem.enrollmentId}`);
    hideBurgerMenu();
  };

  const renderMenuContent = (_class: Maybe<Class>) => {
    if (isTeacher) {
      return (
        <>
          <DropdownMenuItem
            onClick={() => onOpenEditModal(_class)}
            icon={<Pencil2Icon />}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => deleteClass(_class?.id)}
            icon={<TrashIcon />}
          >
            Delete
          </DropdownMenuItem>
        </>
      );
    } else {
      return (
        <>
          <DropdownMenuItem
            onClick={() => deleteClass(_class?.id)}
            icon={<TrashIcon />}
          >
            Unenroll
          </DropdownMenuItem>
        </>
      );
    }
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
            menuContent={renderMenuContent(classItem)}
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
