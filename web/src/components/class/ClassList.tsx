import { Query } from "../../graphql/generated";

type Props = {
  classes: Query["classes"];
};

const ClassList: React.FC<Props> = ({ classes }) => {
  if (!classes) return null;

  return (
    <div>
      {classes.map((classItem) =>
        classItem ? <p key={classItem.id}>{classItem.name}</p> : null
      )}
    </div>
  );
};
export default ClassList;
