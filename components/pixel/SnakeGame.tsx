"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

type Direction = { x: number; y: number };

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const directionRef = useRef<Direction>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleDirection = (newDir: Direction) => {
    const currentDir = directionRef.current;
    // Prevent 180-degree turns
    if (newDir.x !== 0 && currentDir.x === 0) {
      directionRef.current = newDir;
    } else if (newDir.y !== 0 && currentDir.y === 0) {
      directionRef.current = newDir;
    }
  };

  useEffect(() => {
    if (!started || isPaused) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let speed = 120;
    let lastTime = 0;
    let running = true;

    directionRef.current = { x: 0, y: 0 };

    const randomFood = () => ({
      x: Math.floor(Math.random() * gridWidth),
      y: Math.floor(Math.random() * gridHeight)
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsPaused(p => !p);
        e.preventDefault();
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          handleDirection({ x: 0, y: -1 });
          e.preventDefault();
          break;
        case "ArrowDown":
        case "s":
        case "S":
          handleDirection({ x: 0, y: 1 });
          e.preventDefault();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          handleDirection({ x: -1, y: 0 });
          e.preventDefault();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          handleDirection({ x: 1, y: 0 });
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);

    const loop = (timestamp: number) => {
      if (!running) return;

      const dir = directionRef.current;

      if (timestamp - lastTime > speed) {
        lastTime = timestamp;

        // Only move if a direction has been set
        if (dir.x !== 0 || dir.y !== 0) {
          const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

          // Check wall collision
          if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
             running = false;
             setGameOver(true);
             return;
          }

          // Check self collision
          if (snake.some(s => s.x === head.x && s.y === head.y)) {
             running = false;
             setGameOver(true);
             return;
          }

          snake.unshift(head);

          // Check food collision
          if (head.x === food.x && head.y === food.y) {
              const newScore = score + 100;
              setScore(newScore);
              if (newScore > highScore) {
                setHighScore(newScore);
              }
              speed = Math.max(60, speed - 3); // Get faster
              food = randomFood();
              // Ensure food doesn't spawn on snake
              while (snake.some(s => s.x === food.x && s.y === food.y)) {
                food = randomFood();
              }
          } else {
              snake.pop();
          }
        }
      }

      // Draw background
      ctx.fillStyle = "#1a1625";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "#2c2137";
      ctx.lineWidth = 1;
      for (let i = 0; i <= gridWidth; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i <= gridHeight; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }

      // Draw food with pulsing effect
      const foodPulse = Math.sin(timestamp / 200) * 2;
      ctx.fillStyle = "#facc15";
      ctx.fillRect(
        food.x * gridSize + 1 - foodPulse/2,
        food.y * gridSize + 1 - foodPulse/2,
        gridSize - 2 + foodPulse,
        gridSize - 2 + foodPulse
      );

      // Add shine to food
      ctx.fillStyle = "#fff";
      ctx.fillRect(food.x * gridSize + 4, food.y * gridSize + 4, 4, 4);

      // Draw snake with gradient
      snake.forEach((s, i) => {
        const isHead = i === 0;
        if (isHead) {
          // Head is brighter
          ctx.fillStyle = "#34d399";
        } else {
          // Body fades
          const opacity = 1 - (i / snake.length) * 0.5;
          ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
        }
        ctx.fillRect(s.x * gridSize + 1, s.y * gridSize + 1, gridSize - 2, gridSize - 2);

        // Add eyes to head
        if (isHead) {
          ctx.fillStyle = "#fff";
          const eyeSize = 3;
          if (dir.x === 1) { // Right
            ctx.fillRect(s.x * gridSize + gridSize - 8, s.y * gridSize + 4, eyeSize, eyeSize);
            ctx.fillRect(s.x * gridSize + gridSize - 8, s.y * gridSize + gridSize - 7, eyeSize, eyeSize);
          } else if (dir.x === -1) { // Left
            ctx.fillRect(s.x * gridSize + 5, s.y * gridSize + 4, eyeSize, eyeSize);
            ctx.fillRect(s.x * gridSize + 5, s.y * gridSize + gridSize - 7, eyeSize, eyeSize);
          } else if (dir.y === -1) { // Up
            ctx.fillRect(s.x * gridSize + 4, s.y * gridSize + 5, eyeSize, eyeSize);
            ctx.fillRect(s.x * gridSize + gridSize - 7, s.y * gridSize + 5, eyeSize, eyeSize);
          } else if (dir.y === 1) { // Down
            ctx.fillRect(s.x * gridSize + 4, s.y * gridSize + gridSize - 8, eyeSize, eyeSize);
            ctx.fillRect(s.x * gridSize + gridSize - 7, s.y * gridSize + gridSize - 8, eyeSize, eyeSize);
          }
        }
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
       window.removeEventListener("keydown", handleKey);
       running = false;
    };
  }, [started, isPaused, score, highScore]);

  const resetGame = () => {
    setStarted(false);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  if (!started) {
     return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-900/20 to-black border-4 border-white p-8 text-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
           <div className="mb-6">
             <div className="text-7xl mb-2">🐍</div>
             <h2 className="text-5xl text-green-400 mb-2 font-bold" style={{ textShadow: '0 0 10px #22c55e' }}>SNAKE.EXE</h2>
             <p className="text-sm text-purple-400 uppercase tracking-widest">Classic Arcade Edition</p>
           </div>

           {highScore > 0 && (
             <div className="mb-6 text-yellow-400">
               <p className="text-sm uppercase tracking-wider">High Score</p>
               <p className="text-3xl font-bold">{highScore}</p>
             </div>
           )}

           <button
             onClick={() => { setStarted(true); setGameOver(false); setScore(0); }}
             className="bg-green-600 text-white px-8 py-4 text-2xl border-4 border-white hover:bg-green-500 transition-all shadow-[0_8px_0_#15803d] hover:translate-y-1 active:translate-y-2 active:shadow-none font-bold mb-6"
           >
             INSERT COIN
           </button>

           <div className="text-sm text-gray-400 space-y-2">
             <p>🎮 Arrow Keys or WASD to Move</p>
             <p>⏸️ SPACE to Pause</p>
             <p>🍎 Eat yellow food to grow</p>
             <p>⚠️ Don't hit walls or yourself!</p>
           </div>
        </div>
     );
  }

  return (
    <div className="flex flex-col items-center">
       <div className="mb-4 flex gap-8 text-2xl font-bold">
         <div className="text-yellow-400">SCORE: <span className="text-white">{score}</span></div>
         <div className="text-purple-400">HIGH: <span className="text-white">{highScore}</span></div>
       </div>

       <div className="relative border-4 border-white bg-black shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          <canvas ref={canvasRef} width={400} height={400} className="block" />

          {isPaused && !gameOver && (
             <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl text-white font-bold mb-4">⏸️ PAUSED</h3>
                  <p className="text-gray-400">Press SPACE to resume</p>
                </div>
             </div>
          )}

          {gameOver && (
             <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-5xl text-red-500 font-bold mb-2" style={{ textShadow: '0 0 20px #ef4444' }}>GAME OVER!</h2>
                <p className="text-xl text-white mb-2">FINAL SCORE</p>
                <p className="text-4xl text-yellow-400 font-bold mb-6">{score}</p>
                {score === highScore && score > 0 && (
                  <p className="text-green-400 mb-4 text-lg">🏆 NEW HIGH SCORE! 🏆</p>
                )}
                <button
                  onClick={resetGame}
                  className="bg-white text-black px-8 py-4 text-xl border-4 border-green-500 hover:bg-gray-200 font-bold shadow-[0_8px_0_#22c55e] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all"
                >
                  TRY AGAIN
                </button>
             </div>
          )}
       </div>

       {/* Mobile/Touch Controls */}
       <div className="mt-6 grid grid-cols-3 gap-2 w-48 md:hidden">
         <div></div>
         <button
           onClick={() => handleDirection({ x: 0, y: -1 })}
           className="bg-blue-600 text-white p-4 border-2 border-white active:bg-blue-700 flex items-center justify-center"
         >
           <ArrowUp size={24} />
         </button>
         <div></div>

         <button
           onClick={() => handleDirection({ x: -1, y: 0 })}
           className="bg-blue-600 text-white p-4 border-2 border-white active:bg-blue-700 flex items-center justify-center"
         >
           <ArrowLeft size={24} />
         </button>
         <button
           onClick={() => setIsPaused(!isPaused)}
           className="bg-yellow-600 text-white p-4 border-2 border-white active:bg-yellow-700 text-xs font-bold"
         >
           {isPaused ? '▶' : '⏸'}
         </button>
         <button
           onClick={() => handleDirection({ x: 1, y: 0 })}
           className="bg-blue-600 text-white p-4 border-2 border-white active:bg-blue-700 flex items-center justify-center"
         >
           <ArrowRight size={24} />
         </button>

         <div></div>
         <button
           onClick={() => handleDirection({ x: 0, y: 1 })}
           className="bg-blue-600 text-white p-4 border-2 border-white active:bg-blue-700 flex items-center justify-center"
         >
           <ArrowDown size={24} />
         </button>
         <div></div>
       </div>

       <button
         onClick={resetGame}
         className="mt-6 text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
       >
         ← BACK TO MENU
       </button>
    </div>
  );
}

