import * as React from "react";
import { GitHub } from "react-feather";
import { useNavigate } from "react-router-dom";
import { animated } from "react-spring";

import MenuButton from "../MenuButton";
import GameInstructions from "../GameInstructions";

import useBoop from "../../hooks/use-boop";

function InitialScreen() {
  const navigate = useNavigate();
  const [boopStyle, boopTrigger] = useBoop({ y: -10 });

  //   <button
  //   onClick={toggleIsModalOpen}
  //   className="aspect-square border-none bg-white"
  //   onMouseEnter={boopTrigger}
  // >
  //   <animated.span style={boopStyle}>
  //     <HelpCircle />
  //   </animated.span>
  // </button>

  return (
    <>
      <h1 className="mb-5 sm:text-5xl">Ultimate Tic-Tac-Toe</h1>

      <div className="flex flex-row justify-between items-center mb-3">
        <a
          href="https://github.com/jeeheezy/ultimate-tic-tac-toe"
          target="_blank"
          onMouseEnter={boopTrigger}
        >
          <animated.span style={boopStyle}>
            <GitHub color="black" />
          </animated.span>
        </a>
        <h2 className="sm:text-3xl">Choose Game Mode:</h2>
        <GameInstructions />
      </div>
      <div className="flex flex-col gap-2 max-w-3xl">
        {/* TODO: can I pass in just the function name instead of anonymous function? How would I type it */}
        <MenuButton handleClick={() => navigate("/localPlay")}>
          Play Locally
        </MenuButton>
        <MenuButton handleClick={() => navigate("/onlinePlay")}>
          Play Online
        </MenuButton>
      </div>
    </>
  );
}

export default InitialScreen;
