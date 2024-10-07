export function calculateWin(board: Array<string | null>) {
  const WIN_CONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < WIN_CONS.length; i++) {
    const [a, b, c] = WIN_CONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  const filteredBoard = board.filter((square) => typeof square === "number");
  if (filteredBoard.length == board.length) {
    return "stalemate";
  }

  return null;
}

// TODO: include logic on handling stalemates
