type ListItemProps = {
  children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center h-14 mb-2 border border-borderColor p-3 rounded-md max-w-xl cursor-pointer select-none transition duration-200 ease-in-out hover:bg-gray-100">
      {children}
    </div>
  );
};

export default ListItem;
