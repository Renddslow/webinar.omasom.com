import { Form } from "@remix-run/react";

import "./Form.css";

export const WebinarForm = ({
  children,
  fetcherKey,
}: {
  children: React.ReactNode;
  fetcherKey: string;
}) => {
  return (
    <Form method="post" navigate={false} fetcherKey={fetcherKey}>
      {children}
    </Form>
  );
};
