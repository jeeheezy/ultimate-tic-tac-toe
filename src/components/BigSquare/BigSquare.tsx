import React from "react";
import SmallSquare from "../SmallSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";
import { calculateWin } from "../../helpers/game.helpers";
import { TurnContext, TurnContextType } from "../App";
import { NextValidSquareContext, NextValidSquareContextType } from "../App";

import { X, Circle } from "react-feather";

export type BigSquareProps = {
  bigSquareOccupied: (id: number) => string | null;
  calculateGameResults: (i: number, winner: string) => void;
  bigSquareId: number;
  newGame: boolean;
  gameWinner: string | null;
};

function BigSquare({
  bigSquareOccupied,
  calculateGameResults,
  bigSquareId,
  newGame,
  gameWinner,
}: BigSquareProps) {
  const [smallSquaresArray, setSmallSquaresArray] = React.useState(
    Array(9).fill(null)
  );
  const { xIsNext, setXIsNext } =
    React.useContext<TurnContextType>(TurnContext);
  const { nextValidSquare, setNextValidSquare } =
    React.useContext<NextValidSquareContextType>(NextValidSquareContext);

  React.useEffect(() => {
    if (newGame) {
      setSmallSquaresArray(Array(9).fill(null));
    }
  }, [newGame]);

  function handleClick(id: number, bigSquareId: number) {
    if (
      smallSquaresArray[id] || // check if SmallSquare is already taken
      bigSquareOccupied(bigSquareId) || // check if the BigSquare the SmallSquare belongs to is already taken
      (nextValidSquare !== null && nextValidSquare !== bigSquareId) || // checking that the SmallSquare is part of the currently valid BigSquare
      gameWinner !== null
    ) {
      return;
    }

    // updating smallSquaresArray state
    const nextSmallSquaresArray: Array<string | null> = [...smallSquaresArray];
    if (xIsNext) {
      nextSmallSquaresArray[id] = "X";
    } else {
      nextSmallSquaresArray[id] = "O";
    }
    setSmallSquaresArray(nextSmallSquaresArray);

    // switch turn order at turn end
    setXIsNext(!xIsNext);

    // determine if any of the BigSquares have been won with the SmallSquaresArray update
    const winner = calculateWin(nextSmallSquaresArray);

    if (winner !== null && winner !== "stalemate") {
      // determine if game has been won
      calculateGameResults(bigSquareId, winner);
      if (id === bigSquareId) {
        setNextValidSquare(null);
        return;
      }
    }

    // if BigSquare of the same id as SmallSquare is already taken, open options to all valid squares
    if (bigSquareOccupied(id) || winner == "stalemate") {
      setNextValidSquare(null);
    } else {
      setNextValidSquare(id);
    }
  }

  function SquareColor(): string {
    if (bigSquareOccupied(bigSquareId) === "X") {
      return "bg-red-200";
    } else if (bigSquareOccupied(bigSquareId) === "O") {
      return "bg-blue-300";
    } else if (nextValidSquare !== bigSquareId && nextValidSquare !== null) {
      return "bg-gray-500";
    } else if (gameWinner) {
      return "bg-gray-500";
    } else {
      return "bg-white";
    }
  }

  return (
    <div
      className={`${SquareColor()} grid grid-cols-3 grid-rows-3 p-2 gap-1 w-full relative`}
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
              {smallSquaresArray[cell]}
            </SmallSquare>
          );
        })
      )}
      {bigSquareOccupied(bigSquareId) === "X" && (
        <X className="absolute w-full h-full opacity-50" color={"red"} />
      )}
      {bigSquareOccupied(bigSquareId) === "O" && (
        <Circle className="absolute w-full h-full opacity-50" color={"blue"} />
      )}
    </div>
  );
}

export default BigSquare;
