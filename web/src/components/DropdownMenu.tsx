import { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";

export type DropdropMenuProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement> &
  MotionProps;

export type DropdownMenuItemProps = {
  children: React.ReactNode;
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
}) => {
  return (
    <p className="flex items-center text-gray-500 py-1 px-2 text-sm cursor-pointer hover:bg-gray-100">
      {children}
    </p>
  );
};
export const DropdownMenu = forwardRef<any, DropdropMenuProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="flex flex-col rounded absolute border border-borderColor shadow-lg bg-white w-20 select-none z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {props.children}
    </div>
  );
});

// export const DropdownMenu = forwardRef<any, DropdropMenuProps>((props, ref) => {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//       }}
//       ref={ref}
//       {...props}
//       className="flex flex-col rounded absolute border border-borderColor shadow-lg bg-white w-20 select-none z-10"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {props.children}
//     </motion.div>
//   );
// });
