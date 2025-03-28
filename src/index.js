import React from 'react';
import ReactDOM from 'react-dom/client';
import './TicTacToe.css';
import Game from './App'; // or wherever your Tic Tac Toe component is located

// Add Tailwind CDN script dynamically
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
tailwindScript.async = true;
document.head.appendChild(tailwindScript);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);