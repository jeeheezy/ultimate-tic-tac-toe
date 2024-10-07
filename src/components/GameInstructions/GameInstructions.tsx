// import * as React from "react";
import { HelpCircle } from "react-feather";
import { animated } from "react-spring";

import Modal from "../Modal";

import useToggle from "../../hooks/use-toggle";
import useBoop from "../../hooks/use-boop";

function GameInstructions() {
  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const [boopStyle, boopTrigger] = useBoop({ y: -10 });
  return (
    <>
      <button
        onClick={toggleIsModalOpen}
        className="aspect-square border-none bg-white"
        onMouseEnter={boopTrigger}
      >
        <animated.span style={boopStyle}>
          <HelpCircle />
        </animated.span>
      </button>
      <Modal
        title="Ultimate Tic-Tac-Toe: Rules of the Game"
        isOpen={isModalOpen}
        handleDismiss={() => toggleIsModalOpen()}
      >
        <p>
          Ultimate tic-tac-toe is a variation and more strategic version of tic
          tac toe that allows for more dynamic and strategic gameplay. This is
          designed for 2 main players (which can be individuals or groups).
        </p>
        <h2 className="text-md mt-2 font-bold">Goal</h2>
        <p>
          To be the first group to complete the large tic tac toe with 3 in a
          row horizontally, vertically, or diagonally
        </p>
        <h2 className="text-md mt-2 font-bold">How to Play</h2>
        <ol className="list-decimal list-inside">
          <li>
            The first player can place their designated shape at any of the 81
            squares provided
          </li>
          <li>
            Whichever square the first player places in a small tic tac toe
            determine the square of the large tic tac toe the next player gets
            to place their shape. They are confied to that small tic tac toe
            ONLY.
          </li>
          <li>
            Should the particular small tic tac toe be occupied already, the
            player that was sent there can choose to place their shape at any
            available spot in the large space.
          </li>
          <li>
            The square is conquered by the player that achieves the 3 in a row
            for that particular small tic tac toe.
          </li>
        </ol>
      </Modal>
    </>
  );

  return <div></div>;
}

export default GameInstructions;
