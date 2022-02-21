import { useRouter } from "next/router";

import { Class, Maybe, Query } from "../../graphql/generated";
import NavbarItem from "../NavbarItem";

type Props = {
  classes: Query["classes"];
  role: "student" | "teacher";
  hideBurgerMenu: () => void;
};

const ClassList: React.FC<Props> = ({ classes, role, hideBurgerMenu }) => {
  const router = useRouter();

  const onItemClick = (classItem: Maybe<Class>) => {
    if (!classItem) return;

    router.push(
      `/class/${role === "student" ? classItem.enrollmentId : classItem.id}`
    );
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
          >
            {classItem.name}
          </NavbarItem>
        ) : null
      )}
    </div>
  );
};
export default ClassList;
