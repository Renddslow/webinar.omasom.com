import type { ReactNode } from "react";

export interface WhenProps {
  children?: ReactNode;
  condition: boolean;
}

export function When({ children, condition }: WhenProps) {
  return condition ? <>{children}</> : null;
}
