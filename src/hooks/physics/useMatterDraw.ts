import { useCallback } from "react";
import Matter from "matter-js";
import type { CustomBody } from "../../physics/types";

export default function useMatterDraw(width: number, height: number) {
  const draw = useCallback((engine: Matter.Engine, ctx: CanvasRenderingContext2D) => {
    const bodies = Matter.Composite.allBodies(engine.world) as CustomBody[];
    ctx.clearRect(0, 0, width, height);
    
    for (const body of bodies) {
      const pos = body.position;
      const r = body.circleRadius;
      const custom = body.custom;
      
      if (!r) continue;
      
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.beginPath();
      ctx.fillStyle = custom?.id === "player" ? "#ffffff" : custom?.color ?? "gray";
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = custom?.id === "player" ? 2 : 1;
      ctx.strokeStyle = custom?.id === "player" ? "#ddd" : "rgba(0,0,0,0.08)";
      ctx.stroke();
      ctx.restore();
    }
  }, [width, height]);

  return { draw };
}
