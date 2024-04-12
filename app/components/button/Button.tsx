import "./Button.css";

export const Button = ({
  children,
  type = "button",
}: {
  children: string;
  type: "submit" | "button";
}) => {
  return (
    <button className="Button" type={type}>
      {children}
    </button>
  );
};
