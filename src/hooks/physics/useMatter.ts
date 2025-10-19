import { useEffect, useRef, useMemo } from "react";
import Matter from "matter-js";
import usePlayer from "./usePlayer";
import useCircles from "./useCircles";
import useMatterDraw from "./useMatterDraw";
import { useWorldManager } from "./useWorldManager";
import { createEngine } from "../../physics";
import type { ColorName } from "../../types";

interface UseMatterOptions {
  width?: number;
  height?: number;
  counts?: Record<ColorName, number>;
  isPaused?: boolean;
}

export default function useMatter(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  opts?: UseMatterOptions
) {
  const width = opts?.width ?? 800;
  const height = opts?.height ?? 600;
  const counts = useMemo(() => opts?.counts ?? { pink: 5, blue: 5, yellow: 5 }, [opts?.counts]);
  const isPausedRef = useRef(false);
  
  isPausedRef.current = opts?.isPaused ?? false;

  const engineRef = useRef(createEngine());
  const worldRef = useRef(engineRef.current.world);

  const { initPlayer, updatePlayer, setMouseTarget, resetPlayer } = usePlayer(
    worldRef,
    width,
    height
  );
  const { clusteredCounts, initCircles, checkClusters, circlesRef, resetCircles } =
    useCircles(worldRef, width, height, counts);

  const { draw } = useMatterDraw(width, height);
  const { clearWorld, initializeWorld, reset } = useWorldManager(
    engineRef,
    worldRef,
    width,
    height,
    resetPlayer,
    resetCircles,
    initPlayer,
    initCircles
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    clearWorld();
    initializeWorld();

    let af: number;
    const loop = () => {
      if (!isPausedRef.current) {
        Matter.Engine.update(engineRef.current);
        updatePlayer(circlesRef.current);
        checkClusters();
      }
      draw(engineRef.current!, ctx);
      af = requestAnimationFrame(loop);
    };
    af = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(af);
  }, [width, height, counts, canvasRef, checkClusters, circlesRef, draw, clearWorld, initializeWorld, updatePlayer]);


  return { setMouseTarget, clusteredCounts, reset, width, height };
}
