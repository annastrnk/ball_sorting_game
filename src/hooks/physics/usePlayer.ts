import { useRef, useCallback } from "react";
import type { Body } from "matter-js";
import type { MutableRefObject } from "react";
import { createPlayerBody, steerBodyTowards, applyRepulsionForces } from "../../physics";
import type { CircleBody } from "../../physics";

export default function usePlayer(
  worldRef: MutableRefObject<import("matter-js").World | null>,
  width: number,
  height: number
) {
  const playerRef = useRef<Body | null>(null);
  const mouseTarget = useRef({ x: width / 2, y: height / 2 });

  const initPlayer = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    playerRef.current = createPlayerBody(world, width / 2, height / 2);
  }, [worldRef, width, height]);

  const updatePlayer = useCallback((circles?: CircleBody[]) => {
    if (!playerRef.current) return;
    
    steerBodyTowards(playerRef.current, mouseTarget.current);
    
    if (circles && circles.length > 0) {
      applyRepulsionForces(playerRef.current, circles);
    }
  }, []);

  const setMouseTarget = useCallback((x: number, y: number) => {
    mouseTarget.current = { x, y };
  }, []);

  const resetPlayer = useCallback(() => {
    playerRef.current = null;
  }, []);

  return { playerRef, initPlayer, updatePlayer, setMouseTarget, resetPlayer };
}
