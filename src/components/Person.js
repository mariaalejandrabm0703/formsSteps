import React from "react";

export const Person = ({ persons }) => {
  return (
    <div>
      {persons.map((p, i) => {
        return <p key={i}>{p.name + " -> " + p.phone}</p>;
      })}
    </div>
  );
};

export default Person;
