import { Query } from "../../graphql/generated";
import NavbarItem from "../NavbarItem";

type Props = {
  classes: Query["classes"];
};

const ClassList: React.FC<Props> = ({ classes }) => {
  if (!classes) return null;

  return (
    <div>
      {classes.map((classItem) =>
        classItem ? (
          <NavbarItem key={classItem.id}>{classItem.name}</NavbarItem>
        ) : null
      )}
    </div>
  );
};
export default ClassList;
