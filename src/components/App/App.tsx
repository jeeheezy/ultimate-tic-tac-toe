import React from "react";
import "./App.css";
import BigSquare from "../BigSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";
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

function App() {
  const [nextValidSquare, setNextValidSquare] = React.useState<number | null>(
    null
  );
  const [xIsNext, setXIsNext] = React.useState<boolean>(false);
  const [bigSquares, setBigSquares] = React.useState(Array(9).fill(null));

  function bigSquareOccupied(i: number) {
    return bigSquares[i];
  }

  function calculateGameResults(i: number, winner: string) {
    const newBigSquares = [...bigSquares];
    newBigSquares[i] = winner;
    setBigSquares(newBigSquares);
    const game_winner = calculateWin(newBigSquares);
    if (game_winner) {
      console.log("you win!");
    }
  }

  return (
    // TODO: add display showing who's turn it is
    // TODO: add banner when game is won to restart and status state to track whether game is ongoing or finished
    // TODO: add modal to display rules of the game for anyone interested
    <NextValidSquareContext.Provider
      value={{ nextValidSquare, setNextValidSquare }}
    >
      <TurnContext.Provider value={{ xIsNext, setXIsNext }}>
        <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-black">
          {THREE_BY_THREE_ARRAY.map((row) =>
            row.map((cell) => {
              return (
                <BigSquare
                  key={cell}
                  bigSquareId={cell}
                  bigSquareOccupied={bigSquareOccupied}
                  calculateGameResults={calculateGameResults}
                />
              );
            })
          )}
        </div>
      </TurnContext.Provider>
    </NextValidSquareContext.Provider>
  );
}

export default App;
