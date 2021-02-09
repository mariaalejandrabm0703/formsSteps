import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Add from "./components/Add";
import { getAll, create, deleteId } from "./services/persons.js";

import "./App.css";

function App() {
  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(function (reason) {
        console.log("Manejar promesa rechazada (" + reason + ") aquí.");
      });
  }, []);

  const [persons, setPersons] = useState([]);
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
      const objet = {
        name: newValue.newName,
        number: newValue.newPhone,
        id: Date.now(),
      };

      create(objet)
        .then((response) => {
          setPersons(persons.concat(response));
        })
        .catch(function (reason) {
          console.log("Manejar promesa rechazada (" + reason + ") aquí.");
        });
    } else {
      alert(`${newValue.newName} is already added to phonebook`);
    }
    setNewValue({ ...newValue, newName: "", newPhone: "" });
    setPersFilt([]);
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

  const deleteById = (id) => {
    deleteId(id)
      .then((response) => {
        let person = persons.filter((p) => {
          return p.id !== id;
        });
        setPersons(person);
      })
      .catch(function (reason) {
        console.log("Manejar promesa rechazada (" + reason + ") aquí.");
      });
  };

  return (
    <>
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
            <Person persons={personFilter} deleteById={deleteById} />
          ) : (
            <Person persons={persons} deleteById={deleteById} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
