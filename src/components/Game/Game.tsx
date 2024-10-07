import React from "react";
import { THREE_BY_THREE_ARRAY } from "../../constants";
import BigSquare from "../BigSquare";
import { calculateWin } from "../../helpers/game.helpers";

export type NextValidSquareContextType = {
  nextValidSquare: number | null;
  setNextValidSquare: (square: number | null) => void;
};

export type TurnContextType = {
  xIsNext: boolean;
  setXIsNext: (value: boolean) => void;
};

export const NextValidSquareContext =
  React.createContext<NextValidSquareContextType>(
    {} as NextValidSquareContextType
  );

export const TurnContext = React.createContext<TurnContextType>(
  {} as TurnContextType
);

function Game() {
  const [nextValidSquare, setNextValidSquare] = React.useState<number | null>(
    null
  );
  const [xIsNext, setXIsNext] = React.useState<boolean>(false);
  const [bigSquaresArray, setBigSquaresArray] = React.useState(
    Array(9).fill(null)
  );
  const [winner, setWinner] = React.useState<string | null>(null);
  const [newGame, setNewGame] = React.useState<boolean>(false);

  function bigSquareOccupied(i: number) {
    return bigSquaresArray[i];
  }

  function calculateGameResults(i: number, winner: string) {
    const newBigSquaresArray = [...bigSquaresArray];
    newBigSquaresArray[i] = winner;
    setBigSquaresArray(newBigSquaresArray);
    const game_winner = calculateWin(newBigSquaresArray);
    if (game_winner) {
      console.log("you win!");
      setWinner(game_winner);
    }
  }

  // function handleRestart() {
  //   setBigSquaresArray(Array(9).fill(null));
  //   setWinner(null);
  //   setNextValidSquare(null);
  //   setXIsNext(false);
  //   setNewGame(true);
  //   // need to reset small squares as well, do I need to lift the SmallSquares Array state?
  // }

  React.useEffect(() => {
    if (!newGame) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNewGame(false);
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [newGame]);

  return (
    <NextValidSquareContext.Provider
      value={{ nextValidSquare, setNextValidSquare }}
    >
      <TurnContext.Provider value={{ xIsNext, setXIsNext }}>
        <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-black mb-3">
          {" "}
          {/* some of bg-black leaking when viewing on certain small screen size*/}
          {THREE_BY_THREE_ARRAY.map((row) =>
            row.map((cell) => {
              return (
                <BigSquare
                  key={cell}
                  bigSquareId={cell}
                  bigSquareOccupied={bigSquareOccupied}
                  calculateGameResults={calculateGameResults}
                  newGame={newGame}
                  gameWinner={winner}
                />
              );
            })
          )}
        </div>
      </TurnContext.Provider>
    </NextValidSquareContext.Provider>
  );
}

export default Game;
