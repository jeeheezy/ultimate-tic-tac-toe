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
  // TODO: add additional layer of security by disabling buttons, hopefully helpful for accessibility
  // const { nextValidSquare } =
  //   React.useContext<NextValidSquareContextType>(NextValidSquareContext);
  // const cannotPlay = nextValidSquare !== null && bigSquareId !== nextValidSquare;

  return (
    <button
      className="aspect-square bg-gray-300 w-full"
      onClick={() => handleClick(id, bigSquareId)}
      // disabled={cannotPlay}
    >
      {children}
    </button>
  );
}

export default SmallSquare;
