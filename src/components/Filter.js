import React from "react";

export const Filter = ({ filter, handleNoteChangeFilter }) => {
  return (
    <div>
      <h3>Filter</h3>
      <input value={filter} onChange={handleNoteChangeFilter} />
    </div>
  );
};
export default Filter;
