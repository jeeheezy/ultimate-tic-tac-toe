import React from "react";
import SmallSquare from "../SmallSquare";
import { THREE_BY_THREE_ARRAY } from "../../constants";

function BigSquare() {
  const [isWon, setIsWon] = React.useState(false);

  function calculateWin() {
    // if 3 in a row
    setIsWon(true);
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 bg-white p-2 gap-1 w-full">
      {THREE_BY_THREE_ARRAY.map((row) =>
        row.map((cell) => {
          return <SmallSquare key={cell} cannotPlay={isWon} />;
        })
      )}
    </div>
  );
}

export default BigSquare;
