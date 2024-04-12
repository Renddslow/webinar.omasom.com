import { CardBody } from "./CardBody";
import { CardTitle } from "./CardTitle";
import { CardHighlight } from "./CardHighlight";

import "./Card.css";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="Card">{children}</div>;
}

Card.Body = CardBody;
Card.Title = CardTitle;
Card.Highlight = CardHighlight;
