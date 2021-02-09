import React from "react";

export const Notification = ({ message, error = false }) => {
  if (message === "") {
    return null;
  }
  const succesfulStyle = {
    color: "green",
    fontStyle: "italic",
    background: "lightgrey",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
  };

  const errorStyle = {
    color: "red",
    fontStyle: "italic",
    background: "lightgrey",
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
  };

  return (
    <>
      {error ? (
        <div style={errorStyle}>{message}</div>
      ) : (
        <div style={succesfulStyle}>{message}</div>
      )}
    </>
  );
};

export default Notification;
