"use client";

import { useState, useEffect } from "react";

export function Minesweeper() {
  const [grid, setGrid] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const rows = 9;
    const cols = 9;
    const mines = 10;
    let newGrid = Array(rows).fill(null).map(() => Array(cols).fill({ isMine: false, isOpen: false, count: 0 }));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c] = { ...newGrid[r][c], isMine: true };
        minesPlaced++;
      }
    }

    // Calculate counts
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (r + i >= 0 && r + i < rows && c + j >= 0 && c + j < cols && newGrid[r + i][c + j].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c] = { ...newGrid[r][c], count };
        }
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
  };

  const handleClick = (r: number, c: number) => {
    if (gameOver || win || grid[r][c].isOpen) return;

    const newGrid = [...grid];
    if (newGrid[r][c].isMine) {
      setGameOver(true);
      // Reveal all
      newGrid.forEach((row, ri) => row.forEach((cell: any, ci: any) => {
         if (cell.isMine) newGrid[ri][ci] = { ...cell, isOpen: true };
      }));
    } else {
      reveal(newGrid, r, c);
      checkWin(newGrid);
    }
    setGrid(newGrid);
  };

  const reveal = (board: any[], r: number, c: number) => {
    if (r < 0 || r >= 9 || c < 0 || c >= 9 || board[r][c].isOpen) return;
    
    board[r][c] = { ...board[r][c], isOpen: true };
    
    if (board[r][c].count === 0) {
       for (let i = -1; i <= 1; i++) {
         for (let j = -1; j <= 1; j++) {
            reveal(board, r + i, c + j);
         }
       }
    }
  };

  const checkWin = (board: any[]) => {
     let opened = 0;
     board.forEach(row => row.forEach((cell: any) => {
        if (cell.isOpen) opened++;
     }));
     if (opened === (9 * 9 - 10)) setWin(true);
  };

  return (
    <div className="bg-[#c0c0c0] p-1">
       <div className="flex justify-between items-center mb-2 border-2 border-gray-500 border-b-white border-r-white p-1 bg-[#c0c0c0]">
          <div className="font-bold text-red-600 bg-black px-1 font-mono">010</div>
          <button onClick={initGame} className="border-2 border-white border-b-black border-r-black active:border-t-black active:border-l-black bg-[#c0c0c0] p-1 text-xl">
             {gameOver ? '😵' : win ? '😎' : '🙂'}
          </button>
          <div className="font-bold text-red-600 bg-black px-1 font-mono">000</div>
       </div>
       <div className="grid grid-cols-9 gap-0 border-2 border-gray-500 border-t-gray-500 border-l-gray-500 border-b-white border-r-white">
          {grid.map((row, r) => row.map((cell: any, c: any) => (
             <button
               key={`${r}-${c}`}
               onClick={() => handleClick(r, c)}
               className={`w-6 h-6 text-xs font-bold flex items-center justify-center border
                  ${cell.isOpen 
                    ? 'border-gray-400 bg-gray-300' 
                    : 'border-t-white border-l-white border-b-black border-r-black bg-[#c0c0c0]'
                  }`}
             >
               {cell.isOpen ? (cell.isMine ? '💣' : cell.count > 0 ? cell.count : '') : ''}
             </button>
          )))}
       </div>
    </div>
  );
}

