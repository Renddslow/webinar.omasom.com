import { Form } from "@remix-run/react";

import "./Form.css";

export const WebinarForm = ({ children }: { children: React.ReactNode }) => {
  return <Form method="post">{children}</Form>;
};
