import React, { useState } from "react";
import Person from "./components/Person";
import "./App.css";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setfilter] = useState("");
  const [personFilter, setPersFilt] = useState([]);

  const handleSumit = (event) => {
    event.preventDefault();

    const p = persons.filter((p) => {
      return p.name === newName;
    });

    if (p.length === 0) {
      setPersons([
        ...persons,
        {
          name: newName,
          phone: newPhone,
        },
      ]);
      setNewName("");
      setNewPhone("");
    } else {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewPhone("");
    }
  };

  const handleNoteChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleNoteChangePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const handleNoteChangeFilter = (event) => {
    let filter = event.target.value;
    setfilter(filter);
    const result = persons.filter(({ name }) => {
      return name.toUpperCase().includes(filter.toUpperCase());
    });
    setPersFilt(result);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <input value={filter} onChange={handleNoteChangeFilter} />
      <hr />
      <form onSubmit={handleSumit}>
        <h2>Add new:</h2>
        <div>
          Name: <input value={newName} onChange={handleNoteChangeName} />
        </div>
        <div>
          Phone: <input value={newPhone} onChange={handleNoteChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <div>
          <h2>Numbers:</h2>
          <hr />
        </div>
        <div>
          {personFilter.length > 0 ? (
            <Person persons={personFilter} />
          ) : (
            <Person persons={persons} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
