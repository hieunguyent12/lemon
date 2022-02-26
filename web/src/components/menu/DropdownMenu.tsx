import { forwardRef } from "react";
import { MotionProps } from "framer-motion";
import { Paper, Box } from "@mantine/core";

import useStyles from "./DropdownMenu.styles";

export type DropdropMenuProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement> &
  MotionProps;

export type DropdownMenuItemProps = {
  children: React.ReactNode;
};

export const DropdownMenu = forwardRef<any, DropdropMenuProps>((props, ref) => {
  const { classes, cx, theme } = useStyles(
    { size: "md" },
    { classNames: undefined, styles: undefined, name: "Menu" }
  );

  return (
    <Box
      ref={ref}
      {...props}
      onClick={(e: any) => e.stopPropagation()}
      className={cx(classes.root)}
    >
      <Paper shadow="md" radius="sm" className={classes.body}>
        {props.children}
      </Paper>
    </Box>
  );
});

export { MenuItem as DropdownMenuItem } from "./MenuItem";
