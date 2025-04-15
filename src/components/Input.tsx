import "../App.css";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "email";
  value?: string | number;
  name?: string;
  placeholder?: string;
  id?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  size?: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  title?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
  autoComplete?: "on" | "off";
  spellCheck?: boolean;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email"
    | "url"
    | "search"
    | "none";
  list?: string;
  form?: string;
  label?: string;
  icon?: React.ReactNode;
  error?: string | boolean;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  multiline?: boolean;
  mainInputRef?: React.Ref<HTMLInputElement>;
}

const Input = ({
  type,
  placeholder,
  value,
  readOnly,
  onChange,
  onSubmit,
  onKeyDown,
  className,
  mainInputRef,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      readOnly={readOnly}
      className={className}
      onKeyDown={onKeyDown}
      ref={mainInputRef}
    />
  );
};

export default Input;
