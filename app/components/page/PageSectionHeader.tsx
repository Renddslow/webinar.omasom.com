import "./Page.css";

export const PageSectionHeader = ({
  children,
  meta,
  subtitle,
}: {
  children: React.ReactNode;
  meta: string;
  subtitle: string;
}) => {
  return (
    <div className="PageSectionHeader">
      <div className="PageSectionHeader__title">
        <p>{meta}</p>
        <h1>{children}</h1>
      </div>
      <p>{subtitle}</p>
    </div>
  );
};
