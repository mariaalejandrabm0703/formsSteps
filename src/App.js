import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Add from "./components/Add";
import Notification from "./components/Notification";
import { getAll, create, deleteId, update } from "./services/persons.js";

import "./App.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [personFilter, setPersFilt] = useState([]);
  const [newValue, setNewValue] = useState({
    newName: "",
    newPhone: "",
    filter: "",
  });
  const [message, setMessage] = useState({ m: "", e: false });

  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(function (reason) {
        setMessage({ m: `Error from server ${reason}`, e: true });
        setTimeout(() => {
          setMessage({ m: "", e: false });
        }, 3000);
      });
  }, []);

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

  const handleSumit = (event) => {
    event.preventDefault();

    const p = persons.filter((p) => {
      return p.name.toUpperCase() === newValue.newName.toUpperCase();
    });

    if (p.length === 0) {
      const objet = {
        name: newValue.newName,
        number: newValue.newPhone,
        id: Date.now(),
      };

      create(objet)
        .then((response) => {
          setPersons([...persons, response]);
          setMessage({
            m: `Person '${objet.name}' was already create from server`,
            e: false,
          });
          setTimeout(() => {
            setMessage({ m: "", e: false });
          }, 3000);
        })
        .catch(function (reason) {
          setMessage({ m: `Error from server ${reason}`, e: true });
          setTimeout(() => {
            setMessage({ m: "", e: false });
          }, 3000);
        });
    } else {
      const objet = {
        name: p[0].name,
        number: newValue.newPhone,
        id: p[0].id,
      };

      update(objet)
        .then(() => {
          let person = persons.filter((p) => {
            return p.id !== objet.id;
          });
          setPersons([...person, objet]);
          setMessage({
            m: `Person '${objet.name}' was already update from server`,
            e: false,
          });
          setTimeout(() => {
            setMessage({ m: "", e: false });
          }, 3000);
        })
        .catch(function (reason) {
          setMessage({ m: `Error from server ${reason}`, e: true });
          setTimeout(() => {
            setMessage({ m: "", e: false });
          }, 3000);
        });
    }
    setNewValue({ ...newValue, newName: "", newPhone: "" });
    setPersFilt([]);
  };

  const deleteById = (id) => {
    deleteId(id)
      .then(() => {
        let person = persons.filter((p) => {
          return p.id !== id;
        });
        setPersons(person);
        setMessage({ m: `It is delete ${id}`, e: false });
        setTimeout(() => {
          setMessage({ m: "", e: false });
        }, 3000);
      })
      .catch(function (reason) {
        setMessage({ m: `Error from server ${reason}`, e: true });
        setTimeout(() => {
          setMessage({ m: "", e: false });
        }, 3000);
      });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message.m} error={message.e} />
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
