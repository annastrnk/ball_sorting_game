import Matter from "matter-js";
import type { CustomBody } from "./types";
import {
  PLAYER_RADIUS,
  PLAYER_MASS,
  PLAYER_FRICTION_AIR,
  PLAYER_RESTITUTION,
} from "../constants";


export function createPlayerBody(
  world: Matter.World,
  x: number,
  y: number,
  radius = PLAYER_RADIUS
) {
  const body = Matter.Bodies.circle(x, y, radius, {
    restitution: PLAYER_RESTITUTION,
    frictionAir: PLAYER_FRICTION_AIR,
    isSensor: false,
    mass: PLAYER_MASS,
  }) as CustomBody;
  
  body.custom = { id: "player" };
  
  if (world) Matter.World.add(world, body);
  return body;
}

