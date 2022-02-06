import React from "react";

const colors = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 ",
  secondary: "border-2 border-primary-600	text-primary-600 hover:bg-primary-100",
};

const sizes = {
  regular: "py-1 px-4",
  small: "py-0.5 px-2.5 text-sm",
};

export type ButtonProps = {
  children: React.ReactNode;
  variant: keyof typeof colors;
  size: keyof typeof sizes;
  icon?: React.ReactNode;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  disabled = false,
  size = "regular",
  icon,
  className,
  ...props
}) => {
  const backgroundColor = colors[variant];
  const sizeClass = sizes[size];

  return (
    <button
      disabled={!!disabled}
      className={`${backgroundColor} ${sizeClass} ${className} flex rounded items-center justify-center transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`}
      {...props}
    >
      <span className="flex items-center">
        {icon && <span className={`mr-2 items-center`}>{icon}</span>}
        {children}
      </span>
    </button>
  );
};
