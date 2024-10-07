import * as React from "react";
import { RefreshCw as Restart } from "react-feather";
import { useNavigate } from "react-router-dom";

import GameInstructions from "../GameInstructions";
import Game from "../Game";
import MenuButton from "../MenuButton";

function LocalScreen() {
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-5 sm:text-5xl">Ultimate Tic-Tac-Toe</h1>

      <div className="flex flex-row justify-between items-center mb-3">
        <button
          onMouseEnter={() => setIsAnimating(true)}
          onAnimationEnd={() => setIsAnimating(false)}
          className={`aspect-square border-none bg-white ${
            isAnimating ? "rotate-on-hover" : ""
          }`}
        >
          <Restart />
        </button>
        <h2 className="sm:text-3xl">Display Turn Here</h2>
        <GameInstructions />
      </div>
      <Game />
      <MenuButton handleClick={() => navigate("/")}>Return Home</MenuButton>
    </>
  );
}

export default LocalScreen;
