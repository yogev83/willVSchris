import React from "react";

export const Again = ({ onClick }) => {
  return (
    <div className="tryAgain" onClick={onClick}>
      Play Again?
    </div>
  );
};
