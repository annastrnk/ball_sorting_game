import { useState, useEffect, useRef } from "react";
import type { ColorName } from "../../types";
import { getBestTime, saveBestTime } from "../../utils/storage";

interface UseGameStateOptions {
  gameStarted: boolean;
  gamePaused: boolean;
  clusteredCounts: Record<string, boolean>;
  counts: Record<string, number>;
  activeColors: ColorName[];
}

export function useGameState(options: UseGameStateOptions) {
  const { gameStarted, gamePaused, clusteredCounts, counts, activeColors } = options;
  

  const [gameTime, setGameTime] = useState(0);
  const [gameWon, setGameWon] = useState(false); 
  const [bestTime, setBestTime] = useState<number | null>(null); 
  const timerRef = useRef<number | null>(null); 
  const winProcessedRef = useRef(false);

  useEffect(() => {
    const saved = getBestTime();
    if (saved !== null) {
      setBestTime(saved);
    }
  }, []);

  useEffect(() => {
    if (gameStarted && !gameWon && !gamePaused) {
      const startTime = Date.now() - gameTime * 1000;
      timerRef.current = window.setInterval(() => {
        setGameTime((Date.now() - startTime) / 1000);
      }, 10);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else if (timerRef.current && gamePaused) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [gameStarted, gameWon, gamePaused, gameTime]);


  useEffect(() => {
    if (!gameStarted || gameWon || gamePaused || winProcessedRef.current) return;

    const colorsWithBalls = activeColors.filter(color => (counts[color] || 0) > 0);
    const allClustered = colorsWithBalls.every(color => clusteredCounts[color]);

    if (allClustered && colorsWithBalls.length > 0) {
      winProcessedRef.current = true; 
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      const isNewRecord = bestTime === null || bestTime === 0 || gameTime < bestTime;
      if (isNewRecord) {
        setBestTime(gameTime);
        saveBestTime(gameTime);
      }
      
      setGameWon(true);
    }
  }, [clusteredCounts, counts, activeColors, gameStarted, gameWon, gamePaused, gameTime, bestTime]);

  const resetGameState = () => {
    setGameTime(0);
    setGameWon(false);
    winProcessedRef.current = false;
  };

  const resetGameOnly = resetGameState;

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return {
    gameTime,
    gameWon,
    bestTime,
    resetGameState,
    resetGameOnly,
    stopTimer,
    setGameWon,
  };
}

