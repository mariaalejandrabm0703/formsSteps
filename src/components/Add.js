import React from "react";

export const Add = ({
  handleSumit,
  newName,
  handleNoteChangeName,
  newPhone,
  handleNoteChangePhone,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default Add;
