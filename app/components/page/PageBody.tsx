export interface PageBodyProps {
  children?: React.ReactNode;
}

export function PageBody({ children }: PageBodyProps) {
  return (
    <main id="content" className="PageBody">
      {children}
    </main>
  );
}
