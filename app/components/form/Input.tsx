import "./Input.css";

interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: "email" | "text";
  required?: boolean;
  onChange: (value: string) => void;
}

export const Input = ({
  label,
  name,
  required = false,
  type = "text",
}: InputProps) => {
  return (
    <div className="FormControl">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} autoComplete="off" />
    </div>
  );
};
