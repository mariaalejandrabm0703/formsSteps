import React from "react";

export const Person = ({ persons }) => {
  console.log(persons);
  return (
    <div>
      <div>
        <h2>Numbers:</h2>
        <hr />
      </div>
      <div>
        {persons.map((p) => {
          return <p key={p.id}>{p.name + " -> " + p.number}</p>;
        })}
      </div>
    </div>
  );
};

export default Person;
