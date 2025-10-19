import Matter from "matter-js";
import { BOUNDARY_THICKNESS, WALL_RESTITUTION, WALL_FRICTION } from "../constants";

export function createBoundaries(
  world: Matter.World,
  width: number,
  height: number,
  thickness = BOUNDARY_THICKNESS
) {
  const wallOptions = {
    isStatic: true,
    restitution: WALL_RESTITUTION,
    friction: WALL_FRICTION,
  };

  const walls = [
    Matter.Bodies.rectangle(
      width / 2,
      -thickness / 2,
      width + thickness * 2,
      thickness,
      wallOptions
    ),
    Matter.Bodies.rectangle(
      width / 2,
      height + thickness / 2,
      width + thickness * 2,
      thickness,
      wallOptions
    ),
    Matter.Bodies.rectangle(
      -thickness / 2,
      height / 2,
      thickness,
      height + thickness * 2,
      wallOptions
    ),
    Matter.Bodies.rectangle(
      width + thickness / 2,
      height / 2,
      thickness,
      height + thickness * 2,
      wallOptions
    ),
  ];
  
  Matter.World.add(world, walls);
  return walls;
}

