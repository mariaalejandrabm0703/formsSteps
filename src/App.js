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
  const [personFilter, setPersFilt] = useState([]);
  const [newValue, setNewValue] = useState({
    newName: "",
    newPhone: "",
    filter: "",
  });

  const handleSumit = (event) => {
    event.preventDefault();

    const p = persons.filter((p) => {
      return p.name === newValue.newName;
    });

    if (p.length === 0) {
      setPersons([
        ...persons,
        {
          name: newValue.newName,
          phone: newValue.newPhone,
        },
      ]);
      setNewValue({ ...newValue, newName: "", newPhone: "" });
    } else {
      alert(`${newValue.newName} is already added to phonebook`);
      setNewValue({ ...newValue, newName: "", newPhone: "" });
    }
  };

  const handleNoteChangeName = (event) => {
    setNewValue({ ...newValue, newName: event.target.value });
  };

  const handleNoteChangePhone = (event) => {
    setNewValue({ ...newValue, newPhone: event.target.value });
  };

  const handleNoteChangeFilter = (event) => {
    let filter = event.target.value;
    setNewValue({ ...newValue, filter: filter });
    const result = persons.filter(({ name }) => {
      return name.toUpperCase().includes(filter.toUpperCase());
    });
    setPersFilt(result);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={newValue.filter}
        handleNoteChangeFilter={handleNoteChangeFilter}
      />
      <hr />
      <Add
        handleSumit={handleSumit}
        newName={newValue.newName}
        handleNoteChangeName={handleNoteChangeName}
        newPhone={newValue.newPhone}
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
