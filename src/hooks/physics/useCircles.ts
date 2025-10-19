import { useRef, useState, useCallback } from "react";
import type { MutableRefObject } from "react";
import type { Body } from "matter-js";
import { createCircleBodies } from "../../physics";
import type { CircleBody } from "../../physics";
import { CLUSTER_THRESHOLD } from "../../constants";

export default function useCircles(
  worldRef: MutableRefObject<import("matter-js").World | null>,
  width: number,
  height: number,
  counts: Record<string, number>
) {
  const circlesRef = useRef<CircleBody[]>([]);
  const [clusteredCounts, setClusteredCounts] = useState<Record<string, boolean>>({});

  const initCircles = useCallback(() => {
    const world = worldRef.current;
    if (!world) return;
    circlesRef.current = createCircleBodies(world, counts, width, height);
  }, [worldRef, counts, width, height]);

  const checkClusters = useCallback(() => {
    const circles = circlesRef.current;
    if (!circles) return;

    const byColor: Record<string, Body[]> = {};
    circles.forEach((c) => {
      if (!byColor[c.color]) {
        byColor[c.color] = [];
      }
      byColor[c.color].push(c.body);
    });

    const status: Record<string, boolean> = {};

    for (const color of Object.keys(byColor)) {
      const bodies = byColor[color];
      if (bodies.length === 0) {
        status[color] = true;
        continue;
      }
      let cx = 0, cy = 0;
      for (const b of bodies) {
        cx += b.position.x;
        cy += b.position.y;
      }
      cx /= bodies.length;
      cy /= bodies.length;
      const maxDist = Math.max(
        ...bodies.map((b) => Math.hypot(b.position.x - cx, b.position.y - cy))
      );
      status[color] = maxDist < CLUSTER_THRESHOLD;
    }

    setClusteredCounts((prev) => {
      const colors = Object.keys(status);
      const changed = colors.some((k) => prev[k] !== status[k]);
      return changed ? status : prev;
    });
  }, []);

  const resetCircles = useCallback(() => {
    circlesRef.current = [];
    setClusteredCounts({});
  }, []);

  return { circlesRef, clusteredCounts, initCircles, checkClusters, resetCircles };
}
