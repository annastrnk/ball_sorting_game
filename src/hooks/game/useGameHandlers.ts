import { useCallback } from "react";
import type { GameAction } from "./useGameReducer";
import type { ColorName } from "../../types";

interface UseGameHandlersProps {
  dispatch: React.Dispatch<GameAction>;
  resetGameState: () => void;
  resetGameOnly: () => void;
  stopTimer: () => void;
  reset: () => void;
}

export function useGameHandlers({
  dispatch,
  resetGameState,
  resetGameOnly,
  stopTimer,
  reset,
}: UseGameHandlersProps) {
  
  const togglePause = useCallback(() => {
    dispatch({ type: 'TOGGLE_PAUSE' });
  }, [dispatch]);

  const handleStartGame = useCallback((newCounts: Record<string, number>, colors: ColorName[]) => {
    dispatch({ type: 'START_GAME', payload: { counts: newCounts, colors } });
    resetGameOnly();
  }, [dispatch, resetGameOnly]);

  const handleBackToConfig = useCallback(() => {
    dispatch({ type: 'BACK_TO_CONFIG' });
    resetGameState();
    stopTimer();
  }, [dispatch, resetGameState, stopTimer]);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
    reset();
    resetGameOnly();
  }, [dispatch, reset, resetGameOnly]);

  return {
    togglePause,
    handleStartGame,
    handleBackToConfig,
    handleRestart,
  };
}
