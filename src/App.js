import React, { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button 
      className={`square w-20 h-20 bg-white border-2 text-4xl font-bold 
                 hover:bg-blue-100 transition-colors duration-200 
                 focus:outline-none focus:ring-2 focus:ring-blue-300
                 shadow-md rounded-lg text-center flex items-center justify-center
                 ${isWinning ? 'bg-green-300 border-green-500' : 'border-blue-500'}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  let status;
  let statusClass = "text-2xl font-semibold mb-4 text-center ";
  if (winner) {
    status = 'Winner: ' + winner;
    statusClass += "text-green-600";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusClass += "text-blue-600";
  }

  return (
    <div className="board bg-gray-100 p-6 rounded-xl shadow-lg">
      <div className={statusClass}>{status}</div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Square 
            key={i} 
            value={squares[i]} 
            onSquareClick={() => handleClick(i)}
            isWinning={winningSquares.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move} className="mb-2">
        <button 
          onClick={() => jumpTo(move)}
          className="px-4 py-2 bg-blue-500 text-white rounded 
                     hover:bg-blue-600 transition-colors duration-200"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="game-container bg-white rounded-xl shadow-2xl p-8 flex space-x-8">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info w-48">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Game History</h2>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}