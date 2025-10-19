import Matter from "matter-js";
import type { Body } from "matter-js";
import type { CircleBody } from "./types";
import { PLAYER_MAX_FORCE, REPULSION_RANGE, REPULSION_FORCE } from "../constants";

export function steerBodyTowards(
  body: Body,
  target: { x: number; y: number },
  maxForce = PLAYER_MAX_FORCE
) {
  const pos = body.position;
  const desired = { x: target.x - pos.x, y: target.y - pos.y };
  const dist = Math.hypot(desired.x, desired.y);
  
  if (dist < 1) return;
  
  const norm = { x: desired.x / dist, y: desired.y / dist };
  
  const forceMag = Math.min(maxForce * Math.pow(dist / 100, 0.8), maxForce);
  
  Matter.Body.applyForce(body, pos, {
    x: norm.x * forceMag,
    y: norm.y * forceMag,
  });
}

export function applyRepulsionForces(
  playerBody: Body,
  circleBodies: CircleBody[],
  range = REPULSION_RANGE,
  force = REPULSION_FORCE
) {
  const playerPos = playerBody.position;

  for (const circle of circleBodies) {
    const circlePos = circle.body.position;
    
    const dx = circlePos.x - playerPos.x;
    const dy = circlePos.y - playerPos.y;
    const dist = Math.hypot(dx, dy);

    if (dist < range && dist > 0.1) {
      const nx = dx / dist;
      const ny = dy / dist;

      const strength = force * (1 - dist / range);
      
      Matter.Body.applyForce(circle.body, circlePos, {
        x: nx * strength,
        y: ny * strength,
      });
    }
  }
}

