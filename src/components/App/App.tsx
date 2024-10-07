import React from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import InitialScreen from "../InitialScreen";
import LocalScreen from "../LocalScreen";
import OnlineScreen from "../OnlineScreen";

function App() {
  // Home screen to determine local or online multiplayer
  // if local, play as currently is set up
  // if online, two separate buttons conditionally rendered to create lobby and join lobby
  // creating lobbyid
  // keep track lobby ids
  // when client tries to establish connection to server, give a unique id (player_id)
  // lobbies object {lobbyid_1: {player1, player2, gamestate}, lobby_id2: {player1, player2, gamestate} ...}
  // if lobby_id's corresponding map already has 2 players, reject connection
  // assign on server X to player 1
  // add logic to ensure you cannot move while it is not your turn (if xIsNext is true and you are X, you can do stuff, otherwise all disabled)
  // whichGame = notChosen, local, online
  // {notChosen && <ChoseGameOption /> } which are two buttons for local and online
  // {local && <LocalGame /> }
  // {online && <OnlineGame />}
  // <Game turn={pass in}/>

  return (
    <>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<InitialScreen />} />
          <Route path="/localPlay" element={<LocalScreen />} />
          <Route path="/onlinePlay" element={<OnlineScreen />} />
        </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
