import { PageBody } from "~/components/page/PageBody";

import "./Page.css";

interface PageProps {
  children?: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return <div className="Page">{children}</div>;
}

Page.Body = PageBody;
