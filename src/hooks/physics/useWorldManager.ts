import { useCallback } from "react";
import Matter from "matter-js";
import { createBoundaries } from "../../physics";

export function useWorldManager(
  engineRef: React.RefObject<Matter.Engine>,
  worldRef: React.RefObject<Matter.World | null>,
  width: number,
  height: number,
  resetPlayer: () => void,
  resetCircles: () => void,
  initPlayer: () => void,
  initCircles: () => void
) {
  const clearWorld = useCallback(() => {
    const world = worldRef.current;
    if (world) {
      Matter.World.clear(world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current.gravity.y = 0;
    }
    resetPlayer();
    resetCircles();
  }, [engineRef, worldRef, resetPlayer, resetCircles]);

  const initializeWorld = useCallback(() => {
    createBoundaries(worldRef.current!, width, height);
    initPlayer();
    initCircles();
  }, [worldRef, width, height, initPlayer, initCircles]);

  const reset = useCallback(() => {
    clearWorld();
    initializeWorld();
  }, [clearWorld, initializeWorld]);

  return { clearWorld, initializeWorld, reset };
}
