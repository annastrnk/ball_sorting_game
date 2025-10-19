import { useRef, useReducer } from "react";
import useMatter from "../physics/useMatter";
import { useGameState } from "./useGameState";
import { useGameHandlers } from "./useGameHandlers";
import { gameReducer } from "./useGameReducer";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "../../constants";


export function useGameLogic() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  
  const [gameState, dispatch] = useReducer(gameReducer, {
    gameStarted: false,
    counts: {},
    activeColors: [],
    gamePaused: false,
  });

  const { setMouseTarget, clusteredCounts, reset, width, height } = useMatter(canvasRef, {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    counts: gameState.counts,
    isPaused: gameState.gamePaused,
  });

  const {
    gameTime,
    gameWon,
    bestTime,
    resetGameState,
    resetGameOnly,
    stopTimer,
  } = useGameState({
    gameStarted: gameState.gameStarted,
    gamePaused: gameState.gamePaused,
    clusteredCounts,
    counts: gameState.counts,
    activeColors: gameState.activeColors,
  });

  const {
    togglePause,
    handleStartGame,
    handleBackToConfig,
    handleRestart,
  } = useGameHandlers({
    dispatch,
    resetGameState,
    resetGameOnly,
    stopTimer,
    reset,
  });

  const colorsWithBalls = gameState.activeColors.filter(color => (gameState.counts[color] || 0) > 0);
  const groupedCount = colorsWithBalls.filter(color => clusteredCounts[color]).length;
  const totalColors = colorsWithBalls.length;

  return {
    canvasRef,
    width,
    height,
    
    gameState,
    gameTime,
    gameWon,
    bestTime,
    
    colorsWithBalls,
    groupedCount,
    totalColors,
    clusteredCounts,
    
    setMouseTarget,
    togglePause,
    handleStartGame,
    handleBackToConfig,
    handleRestart,
  };
}
