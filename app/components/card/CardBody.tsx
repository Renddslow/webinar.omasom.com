export const CardBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="Card__body">
      <p>{children}</p>
    </div>
  );
};
