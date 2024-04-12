export interface PageSectionProps {
  children?: React.ReactNode;
}

export function PageSection({ children }: PageSectionProps) {
  return <section className="PageSection">{children}</section>;
}
