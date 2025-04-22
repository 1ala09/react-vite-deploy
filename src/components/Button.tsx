import "./Button.css";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean; //button inactive or unclickable
  variant?: string;
  size?: "small" | "medium" | "large";
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

const Button = ({
  onClick,
  disabled,
  variant,
  size,
  type,
  children,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) => {
  const variantclassName =
    variant === "default"
      ? "btn-default"
      : variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
      ? "btn-secondary"
      : variant === "outline"
      ? "btn-outline"
      : variant === "destructive"
      ? "btn-destructive"
      : null;
  const sizeclassName =
    size === "small"
      ? "btn-small"
      : size === "medium"
      ? "btn-medium"
      : size === "large"
      ? "btn-large"
      : null;
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${className} ${variantclassName} ${sizeclassName}`}
      disabled={disabled}
      type={type ? type : "button"}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
