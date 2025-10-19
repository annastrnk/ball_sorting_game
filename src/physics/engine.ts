import Matter from "matter-js";

export function createEngine() {
  const engine = Matter.Engine.create();
  engine.gravity.y = 0; 
  return engine;
}

