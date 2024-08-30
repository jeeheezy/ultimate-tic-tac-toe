import React from "react";
import SmallSquare from "../SmallSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";
import { calculateWin } from "../../helpers/game.helpers";
import { TurnContext, TurnContextType } from "../App";
import { NextValidSquareContext, NextValidSquareContextType } from "../App";
export type BigSquareProps = {
  bigSquareOccupied: (id: number) => string | null;
  calculateGameResults: (i: number, winner: string) => void;
  bigSquareId: number;
};

function BigSquare({
  bigSquareOccupied,
  calculateGameResults,
  bigSquareId,
}: BigSquareProps) {
  const [smallSquares, setSmallSquares] = React.useState(Array(9).fill(null));
  const { xIsNext, setXIsNext } =
    React.useContext<TurnContextType>(TurnContext);
  const { nextValidSquare, setNextValidSquare } =
    React.useContext<NextValidSquareContextType>(NextValidSquareContext);

  function handleClick(id: number, bigSquareId: number) {
    if (
      smallSquares[id] || // check if SmallSquare is already taken
      bigSquareOccupied(bigSquareId) || // check if the BigSquare the SmallSquare belongs to is already taken
      (nextValidSquare !== null && nextValidSquare !== bigSquareId) // checking that the SmallSquare is part of the currently valid BigSquare
    ) {
      return;
    }

    // updating smallSquares state
    const nextSmallSquares: Array<string | null> = [...smallSquares];
    if (xIsNext) {
      nextSmallSquares[id] = "X";
    } else {
      nextSmallSquares[id] = "O";
    }
    setSmallSquares(nextSmallSquares);

    // switch turn order at turn end
    setXIsNext(!xIsNext);

    // determine if any of the BigSquares have been won with the SmallSquares update
    // TODO: add appropriate icon image overlay to indicate who won the BigSquare
    const winner = calculateWin(nextSmallSquares);
    if (winner !== null) {
      // reset next valid square so any options are available
      setNextValidSquare(null);
      // determine if game has been won
      calculateGameResults(bigSquareId, winner);
    } else {
      // if BigSquare of the same id as SmallSquare is already taken, open options to all valid squares
      if (bigSquareOccupied(id)) {
        setNextValidSquare(null);
      } else {
        setNextValidSquare(id);
      }
    }
  }

  return (
    <div
      className={`${
        nextValidSquare === bigSquareId && !bigSquareOccupied(bigSquareId)
          ? "bg-green-200"
          : ""
      } ${
        bigSquareOccupied(bigSquareId) ? "bg-red-200" : ""
      } grid grid-cols-3 grid-rows-3 bg-white p-2 gap-1 w-full`}
    >
      {THREE_BY_THREE_ARRAY.map((row) =>
        row.map((cell) => {
          return (
            <SmallSquare
              bigSquareId={bigSquareId}
              id={cell}
              key={cell}
              handleClick={handleClick}
            >
              {smallSquares[cell]}
            </SmallSquare>
          );
        })
      )}
    </div>
  );
}

export default BigSquare;
