import React from "react";

export const Person = ({ persons }) => {
  return (
    <div>
      <div>
        <h2>Numbers:</h2>
        <hr />
      </div>
      <div>
        {persons.map((p, i) => {
          return <p key={i}>{p.name + " -> " + p.phone}</p>;
        })}
      </div>
    </div>
  );
};

export default Person;
