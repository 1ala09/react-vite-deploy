interface ListProps {
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
  onKeyPress?: () => void;
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
  inputRef?: React.Ref<HTMLInputElement>;
}

const List = ({
  className,
  value,
  readOnly,
  type,
  onChange,
  onBlur,
  inputRef,
}: ListProps) => {
  return (
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      className={className}
      onChange={onChange}
      ref={inputRef}
      onBlur={onBlur}
    />
  );
};

export default List;
