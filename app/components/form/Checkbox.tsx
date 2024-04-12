import "./Input.css";

export const Checkbox = ({ name, label }: { name: string; label: string }) => {
  return (
    <div className="CheckboxControl">
      <input type="checkbox" id={name} name={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
