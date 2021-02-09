import React from "react";

export const Person = ({ persons, deleteById }) => {
  return (
    <div>
      <div>
        <h2>Numbers:</h2>
        <hr />
      </div>
      <ul>
        {persons.map((p) => {
          return (
            <li key={p.id}>
              <p>{p.id + ": " + p.name + " -> " + p.number}</p>
              <button onClick={() => deleteById(p.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Person;
