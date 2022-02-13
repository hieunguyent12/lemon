type ListItemProps = {
  isClickable?: boolean;
  children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({
  children,
  isClickable = true,
}) => {
  let hoverClass = isClickable ? "cursor-pointer hover:bg-gray-100" : "";

  return (
    <div
      className={`${hoverClass} flex justify-between items-center h-14 mb-2 border border-borderColor p-3 rounded-md max-w-xl transition duration-200 ease-in-out`}
    >
      {children}
    </div>
  );
};

export default ListItem;
