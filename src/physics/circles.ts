import Matter from "matter-js";
import { COLORS, rand } from "../utils";
import type { ColorName } from "../types";
import type { CircleBody, CustomBody } from "./types";
import {
  BALL_RADIUS,
  CIRCLE_RESTITUTION,
  CIRCLE_FRICTION_AIR,
  CIRCLE_FRICTION,
  CIRCLE_DENSITY_FACTOR,
} from "../constants";

export function createCircleBodies(
  world: Matter.World,
  counts: Record<string, number>,
  areaW: number,
  areaH: number,
  radiusRange = BALL_RADIUS
) {
  const circles: CircleBody[] = [];
  const colors = Object.keys(counts);
  
  for (const color of colors) {
    const count = counts[color];
    if (count <= 0) continue; 
    
    for (let i = 0; i < count; i++) {
      const r = radiusRange;
      const x = rand(r + 20, areaW - r - 20);
      const y = rand(r + 20, areaH - r - 20);
      
      const body = Matter.Bodies.circle(x, y, r, {
        restitution: CIRCLE_RESTITUTION,
        frictionAir: CIRCLE_FRICTION_AIR,
        friction: CIRCLE_FRICTION,
        density: CIRCLE_DENSITY_FACTOR * (r / 20),
      }) as CustomBody;
      
      const colorHex = COLORS[color as ColorName] || '#ffffff';
      body.custom = { color: colorHex, id: `${color}-${i}` };

      Matter.World.add(world, body);
      circles.push({ id: `${color}-${i}`, color: color as ColorName, body });
    }
  }
  
  return circles;
}

