"use client";

import { useState, useEffect, useRef } from "react";

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let speed = 100;
    let lastTime = 0;
    let running = true;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (dy === 0) { dx = 0; dy = -1; } break;
        case "ArrowDown": if (dy === 0) { dx = 0; dy = 1; } break;
        case "ArrowLeft": if (dx === 0) { dx = -1; dy = 0; } break;
        case "ArrowRight": if (dx === 0) { dx = 1; dy = 0; } break;
      }
    };
    window.addEventListener("keydown", handleKey);

    const loop = (timestamp: number) => {
      if (!running) return;
      
      if (timestamp - lastTime > speed) {
        lastTime = timestamp;
        
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        // Check collision
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize || snake.some(s => s.x === head.x && s.y === head.y)) {
           running = false;
           setGameOver(true);
           return;
        }

        if (dx !== 0 || dy !== 0) {
           snake.unshift(head);
           if (head.x === food.x && head.y === food.y) {
              setScore(s => s + 100);
              speed = Math.max(50, speed - 2);
              food = {
                 x: Math.floor(Math.random() * (canvas.width / gridSize)),
                 y: Math.floor(Math.random() * (canvas.height / gridSize))
              };
           } else {
              snake.pop();
           }
        }
      }

      // Draw
      ctx.fillStyle = "#2c2137";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Food
      ctx.fillStyle = "#facc15";
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

      // Snake
      ctx.fillStyle = "#22c55e";
      snake.forEach(s => {
         ctx.fillRect(s.x * gridSize, s.y * gridSize, gridSize - 2, gridSize - 2);
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
       window.removeEventListener("keydown", handleKey);
       running = false;
    };
  }, [started]);

  if (!started) {
     return (
        <div className="flex flex-col items-center justify-center h-full bg-black border-4 border-white p-8 text-center">
           <h2 className="text-4xl text-green-500 mb-4 font-bold">SNAKE.EXE</h2>
           <button 
             onClick={() => { setStarted(true); setGameOver(false); setScore(0); }}
             className="bg-blue-600 text-white px-6 py-3 text-xl border-2 border-white hover:bg-blue-500"
           >
             INSERT COIN
           </button>
           <p className="mt-4 text-sm text-gray-400">Use Arrow Keys to Move</p>
        </div>
     );
  }

  return (
    <div className="flex flex-col items-center">
       <div className="mb-4 text-2xl text-yellow-400 font-bold">SCORE: {score}</div>
       <div className="relative border-4 border-white bg-black">
          <canvas ref={canvasRef} width={400} height={400} className="block" />
          {gameOver && (
             <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl text-red-500 font-bold mb-4">GAME OVER</h2>
                <p className="text-xl text-white mb-8">FINAL SCORE: {score}</p>
                <button 
                  onClick={() => setStarted(false)}
                  className="bg-white text-black px-6 py-3 text-xl border-4 border-blue-500 hover:bg-gray-200"
                >
                  TRY AGAIN
                </button>
             </div>
          )}
       </div>
    </div>
  );
}

