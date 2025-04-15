import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  type?: "success" | "danger" | "info" | "warning";
  onClose: () => void;
  duration?: number;
  closable: boolean;
}
const Alert = ({ children, type, onClose, closable }: AlertProps) => {
  const className =
    type === "success"
      ? "alert alert-success alert-dismissible"
      : type === "danger"
      ? "alert alert-danger alert-dismissible"
      : type === "info"
      ? "alert alert-primary alert-dismissible"
      : type === "warning"
      ? "alert alert-warning alert-dismissible"
      : "alert alert-primary alert-dismissible";

  return (
    <div className={className} role="alert">
      {children}
      {closable && (
        <button type="button" className="btn-close" onClick={onClose}></button>
      )}
    </div>
  );
};

export default Alert;
