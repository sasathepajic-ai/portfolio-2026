"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Cell = "X" | "O" | null;
type Result = "X" | "O" | "draw" | null;

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board: Cell[]): Result {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a] as "X" | "O";
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

function getWinLine(board: Cell[]): number[] | null {
  for (const line of LINES) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
  }
  return null;
}

// Smart-ish AI: win > block > center > opposite corner > any corner > edge > random
// ~20% of the time it takes a "blunder" (random) so it stays beatable
function computerMove(board: Cell[], cpuMark: "X" | "O"): number {
  const playerMark: Cell = cpuMark === "X" ? "O" : "X";
  const empty = board.map((v, i) => v === null ? i : -1).filter(i => i !== -1);

  // helper: find a winning move for a given mark
  const findWin = (mark: Cell) => {
    for (const [a, b, c] of LINES) {
      const cells = [board[a], board[b], board[c]];
      const positions = [a, b, c];
      const markCount = cells.filter(v => v === mark).length;
      const nullIdx = cells.findIndex(v => v === null);
      if (markCount === 2 && nullIdx !== -1) return positions[nullIdx];
    }
    return -1;
  };

  // 20% chance of a blunder — keeps the AI beatable
  if (Math.random() < 0.2) {
    return empty[Math.floor(Math.random() * empty.length)];
  }

  // 1. Take the win
  const win = findWin(cpuMark);
  if (win !== -1) return win;

  // 2. Block player's imminent win
  const block = findWin(playerMark);
  if (block !== -1) return block;

  // 3. Take center
  if (board[4] === null) return 4;

  // 4. Take opposite corner from player
  const cornerPairs: [number, number][] = [[0,8],[2,6],[6,2],[8,0]];
  for (const [opp, here] of cornerPairs) {
    if (board[opp] === playerMark && board[here] === null) return here;
  }

  // 5. Any free corner
  for (const i of [0, 2, 6, 8]) {
    if (board[i] === null) return i;
  }

  // 6. Any free edge
  for (const i of [1, 3, 5, 7]) {
    if (board[i] === null) return i;
  }

  return empty[0];
}

export default function OXOGame() {
  const [playerMark, setPlayerMark] = useState<"X" | "O" | null>(null);
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });
  const [result, setResult] = useState<Result>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [thinking, setThinking] = useState(false);
  const thinkingRef = useRef(false);

  const computerMark: "X" | "O" | null = playerMark === "X" ? "O" : playerMark === "O" ? "X" : null;
  const isComputerTurn = !!playerMark && !result && (xIsNext ? computerMark === "X" : computerMark === "O");

  const applyMove = useCallback((idx: number, current: Cell[], nextX: boolean) => {
    const mark: Cell = nextX ? "X" : "O";
    const next = [...current];
    next[idx] = mark;
    const res = checkWinner(next);
    const line = getWinLine(next);
    setBoard(next);
    setXIsNext(!nextX);
    if (res) {
      setResult(res);
      setWinLine(line);
      setScore(s => ({ ...s, [res]: s[res as keyof typeof s] + 1 }));
    }
  }, []);

  // Computer move with a small delay so it feels like thinking
  useEffect(() => {
    if (!isComputerTurn || thinkingRef.current) return;
    thinkingRef.current = true;
    const delay = 350 + Math.random() * 400;
    const t = setTimeout(() => {
      setThinking(true);
      const idx = computerMove(board, computerMark as "X" | "O");
      applyMove(idx, board, xIsNext);
      thinkingRef.current = false;
      setThinking(false);
    }, delay);
    return () => clearTimeout(t);
  }, [isComputerTurn, board, xIsNext, applyMove, computerMark]);

  const handleCell = (i: number) => {
    if (!playerMark || board[i] || result || isComputerTurn || thinking) return;
    applyMove(i, board, xIsNext);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setResult(null);
    setWinLine(null);
    setThinking(false);
  };

  const currentTurnMark: "X" | "O" = xIsNext ? "X" : "O";
  const isMyTurn = playerMark && !result && currentTurnMark === playerMark;

  return (
    <div className="font-mono select-none w-full">

      {/* Header */}
      <div className="text-[9px] text-secondary/45 tracking-[0.20em] uppercase mb-3">
        {`// OXO.exe`}
      </div>

      {/* Pick side */}
      {!playerMark ? (
        <div className="space-y-2">
          <p className="text-[10px] text-secondary/60 mb-3">Pick your mark:</p>
          {(["X","O"] as const).map(m => (
            <button
              key={m}
              onClick={() => setPlayerMark(m)}
              className="w-full text-left text-[11px] border border-primary/25 px-3 py-2 text-primary/70 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-150"
            >
              <span className="text-primary/40 mr-2">&gt;</span> Play as {m}
              {m === "O" && <span className="text-secondary/40 ml-2 text-[9px]">(computer goes first)</span>}
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* Score */}
          <div className="flex gap-0 mb-4 border border-primary/15 text-[9px]">
            {[
              { label: `YOU`, sub: playerMark, val: score[playerMark] },
              { label: "DRAW", sub: null, val: score.draw },
              { label: `CPU`, sub: computerMark, val: score[computerMark!] },
            ].map(({ label, sub, val }, i) => (
              <div key={i} className={`flex-1 text-center py-2 flex flex-col items-center justify-between gap-0.5 ${i < 2 ? "border-r border-primary/15" : ""}`}>
                <div className="text-secondary/40 tracking-widest">{label}</div>
                <div className="text-secondary/30 text-[8px] h-3 leading-3">{sub ?? ""}</div>
                <div className="text-primary/80 text-[12px] font-bold">{val}</div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className="text-[9px] text-secondary/55 mb-3 h-4 tracking-wide">
            {result
              ? result === "draw"
                ? "// draw — no winner"
                : result === playerMark
                  ? "// you won. nice."
                  : "// computer wins. it happens."
              : thinking
                ? "// cpu thinking..."
                : isMyTurn
                  ? `// your turn — place ${playerMark}`
                  : `// waiting...`
            }
          </div>

          {/* Board */}
          <div className="grid grid-cols-3 border border-primary/20 mb-3">
            {board.map((cell, i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const isWin = winLine?.includes(i);
              const borderClasses = [
                row < 2 ? "border-b" : "",
                col < 2 ? "border-r" : "",
              ].filter(Boolean).join(" ") + " border-primary/20";

              return (
                <button
                  key={i}
                  onClick={() => handleCell(i)}
                  className={`
                    h-20 w-full flex items-center justify-center
                    text-2xl font-bold transition-all duration-100
                    ${borderClasses}
                    ${!cell && !result && isMyTurn && !thinking ? "hover:bg-primary/5 cursor-pointer" : "cursor-default"}
                    ${isWin ? "bg-primary/10" : ""}
                  `}
                >
                  {cell && (
                    <span className={`
                      leading-none
                      ${cell === "X" ? "text-primary" : "text-secondary/70"}
                      ${isWin ? "glow-flicker" : ""}
                    `}>
                      {cell}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="flex-1 text-[9px] border border-primary/20 px-2 py-1.5 text-secondary/50 hover:border-primary/50 hover:text-primary/70 transition-all duration-150 tracking-widest uppercase"
            >
              new game
            </button>
            <button
              onClick={() => { reset(); setPlayerMark(null); setScore({ X:0, O:0, draw:0 }); }}
              className="flex-1 text-[9px] border border-primary/20 px-2 py-1.5 text-secondary/50 hover:border-primary/50 hover:text-primary/70 transition-all duration-150 tracking-widest uppercase"
            >
              reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
