import { PageBody } from "./PageBody";
import { PageSection } from "./PageSection";

import "./Page.css";

interface PageProps {
  children?: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return <div className="Page">{children}</div>;
}

Page.Body = PageBody;
Page.Section = PageSection;
