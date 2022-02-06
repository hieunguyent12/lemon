import React from "react";

const sizes = {
  regular: "py-1 px-3",
};

export type InputProps = {
  inputType?: "text" | "password";
  size?: keyof typeof sizes;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  children,
  disabled = false,
  inputType = "text",
  className,
  size = "regular",
  ...props
}) => {
  const inputSize = sizes[size];
  return (
    <input
      type={inputType}
      {...props}
      className={`${inputSize} ${className} shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:ring`}
    ></input>
  );
};
