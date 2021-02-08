import React, { useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Add from "./components/Add";
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
      <Filter filter={filter} handleNoteChangeFilter={handleNoteChangeFilter} />
      <hr />
      <Add
        handleSumit={handleSumit}
        newName={newName}
        handleNoteChangeName={handleNoteChangeName}
        newPhone={newPhone}
        handleNoteChangePhone={handleNoteChangePhone}
      />
      <div>
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
