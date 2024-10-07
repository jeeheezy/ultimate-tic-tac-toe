import React from "react";
// import { NextValidSquareContext, NextValidSquareContextType } from "../App";

export type SmallSquareProps = {
  children?: React.ReactNode;
  id: number;
  bigSquareId: number;
  handleClick: (id: number, bigSquareId: number) => void;
};

function SmallSquare({
  id,
  // squareIsWon,
  bigSquareId,
  handleClick,
  children,
}: SmallSquareProps) {
  // if I want to make hover indicate the next player's turn
  // is children unpopulated
  // is bigSquare valid
  // if both conditions are met, create element of whatever turns next and style with CSS on hover, and otherwise default display none

  return (
    <button
      className="aspect-square bg-gray-300 w-6 sm:w-11 sm:focus:outline sm:outline-2 sm:text-3xl"
      onClick={() => handleClick(id, bigSquareId)}
      // disabled={cannotPlay}
    >
      {children}
    </button>
  );
}

export default SmallSquare;
