import React from "react";
import "./App.css";
import { HelpCircle, RefreshCw as Restart } from "react-feather";
import BigSquare from "../BigSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";
import { calculateWin } from "../../helpers/game.helpers";
import useToggle from "../../hooks/use-toggle";
import Modal from "../Modal";

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
  const [bigSquaresArray, setBigSquaresArray] = React.useState(
    Array(9).fill(null)
  );
  const [winner, setWinner] = React.useState<string | null>(null);
  const [newGame, setNewGame] = React.useState<boolean>(false);
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

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

  function handleRestart() {
    setBigSquaresArray(Array(9).fill(null));
    setWinner(null);
    setNextValidSquare(null);
    setXIsNext(false);
    setNewGame(true);
    // need to reset small squares as well, do I need to lift the SmallSquares Array state?
  }

  React.useEffect(() => {
    if (!newGame) {
      return;
    }

    setNewGame(false);
  }, [newGame]);

  return (
    <NextValidSquareContext.Provider
      value={{ nextValidSquare, setNextValidSquare }}
    >
      <TurnContext.Provider value={{ xIsNext, setXIsNext }}>
        <h1 className="mb-5 sm:text-5xl">Ultimate Tic-Tac-Toe</h1>
        <div className="flex flex-row justify-between items-center mb-3">
          <button
            onClick={handleRestart}
            className="aspect-square border-none bg-white"
          >
            <Restart />
          </button>
          <h2 className="sm:text-3xl">
            {winner === null
              ? `Current Player: ${xIsNext ? "X" : "O"}`
              : `Winner: ${winner}`}
          </h2>
          <Modal
            title="Ultimate Tic-Tac-Toe: Rules of the Game"
            description="Rules of ultimate tic-tac-toe"
            isOpen={isModalOpen}
            handleDismiss={() => toggleIsModalOpen()}
          >
            <p>Test</p>
          </Modal>
          <button
            onClick={toggleIsModalOpen}
            className="aspect-square border-none bg-white"
          >
            <HelpCircle />
          </button>
        </div>

        <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-black">
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

export default App;
