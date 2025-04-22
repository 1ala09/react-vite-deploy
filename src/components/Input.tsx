import "./Input.css";

interface InputProps {
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "time"
    | "search"
    | "color"
    | "image"
    | "hidden"
    | "submit"
    | "reset"
    | "button";
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  relativeclassName?: string;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  lefticon?: React.ReactNode;
  lefticonclassName?: string;
  righticonclassName?: string;
  tooltipclassName?: string;
  righticon?: React.ReactNode;
  min?: string | number;
  max?: string | number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  invisibleTitle?: boolean;
  checked?: boolean;
}

const Input = ({
  type,
  value,
  onChange,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  placeholder,
  name,
  id,
  className,
  relativeclassName,
  lefticonclassName,
  righticonclassName,
  tooltipclassName,
  disabled,
  required,
  defaultValue,
  style,
  title,
  invisibleTitle,
  helperText,
  error,
  lefticon,
  righticon,
  min,
  max,
  checked,
}: InputProps) => {
  return (
    <>
      <span className={`relative ${relativeclassName}`}>
        {lefticon && (
          <span className={`left-icon ${lefticonclassName}`}>{lefticon}</span>
        )}
        <input
          type={type}
          checked={checked}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          name={name}
          id={id}
          className={`input-component ${className} ${
            error ? "input-error" : ""
          }`}
          value={value}
          disabled={disabled}
          required={required}
          defaultValue={defaultValue}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          min={min}
          max={max}
        />
        {righticon && (
          <span className={`right-icon ${righticonclassName}`}>
            {righticon}
          </span>
        )}
      </span>
      {invisibleTitle && (
        <span className={`tool-tip ${tooltipclassName}`}>{title}</span>
      )}
      <br />
      {helperText && <span>{helperText}</span>}
    </>
  );
};

export default Input;
