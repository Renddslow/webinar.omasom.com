import "./Input.css";

interface SelectProps {
  id?: string;
  label: string;
  name: string;
  options: string[];
}

export const Select = ({ label, name, options }: SelectProps) => {
  return (
    <div className="FormControl">
      <label htmlFor={name}>{label}</label>
      <select name={name}>
        {options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
