import React from "react";
import "./App.css";
import BigSquare from "../BigSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";

export const CurrentSquareContext = React.createContext();

function App() {
  const [currentSquare, setCurrentSquare] = React.useState();

  return (
    <CurrentSquareContext.Provider value={{ currentSquare, setCurrentSquare }}>
      <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-black">
        {THREE_BY_THREE_ARRAY.map((row) =>
          row.map((cell) => {
            return <BigSquare key={cell} />;
          })
        )}
      </div>
    </CurrentSquareContext.Provider>
  );
}

export default App;
