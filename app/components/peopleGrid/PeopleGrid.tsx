import type { Person } from "~/api/types";

import "./PeopleGrid.css";

export const PeopleGrid = ({ people }: { people: Person[] }) => (
  <div className="PeopleGrid">
    {people.map((person) => (
      <div className="PeopleGrid__Person" key={person.name}>
        <img src={person.image} alt={person.title} />
        <div>
          <p>{person.name}</p>
          <p>{person.title}</p>
          <p>{person.org}</p>
        </div>
      </div>
    ))}
  </div>
);
