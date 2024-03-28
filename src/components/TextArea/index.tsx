import { TextAreaContainer } from "./TextArea.styled";

type TextAreaProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  maxLength?: number;
  onEnter?: () => void;
  className?: string;
  onFocusChange?: (isFocus: boolean) => void;
};

const TextArea = ({
  value,
  onChange,
  placeholder,
  maxLength,
  onEnter,
  className,
  onFocusChange,
}: TextAreaProps) => {
  const resizeTextArea = (textAreaNode: HTMLTextAreaElement) => {
    textAreaNode.style.height = "28px";
    const scrollHeight = textAreaNode.scrollHeight;

    textAreaNode.style.height = scrollHeight + "px";
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    resizeTextArea(e.target);
  };

  return (
    <TextAreaContainer
      value={value}
      onChange={handleOnChange}
      maxLength={maxLength}
      onKeyDown={(target) => {
        if (onEnter && target.key === "Enter") onEnter();
      }}
      placeholder={placeholder}
      className={className}
      onFocus={() => onFocusChange?.(true)}
      onBlur={() => onFocusChange?.(false)}
    />
  );
};

export default TextArea;
