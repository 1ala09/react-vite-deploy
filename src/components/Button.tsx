import { Children, ReactNode } from "react";
import "../App.css";

interface ButtonProps {
  children: ReactNode;
  variant: string;
  onClick: () => void;
}

const Button = ({ variant, children, onClick }: ButtonProps) => {
  const className =
    variant === "delete"
      ? "deleteBtn"
      : variant === "add"
      ? "addBtn"
      : variant === "edit"
      ? "editBtn"
      : variant === "complete"
      ? "completeBtn"
      : "defaultBtn";
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
