import type { ColorName } from "../types";
import { ALL_COLORS } from "../types";

export const DEFAULT_WIDTH = 900;
export const DEFAULT_HEIGHT = 600;

export const MIN_CANVAS_WIDTH = 600;
export const MIN_CANVAS_HEIGHT = 400;
export const MAX_CANVAS_WIDTH = 1200;
export const MAX_CANVAS_HEIGHT = 800;
export const CANVAS_ASPECT_RATIO = 1.5;

export const MIN_COLORS = 2;
export const MAX_COLORS = 6;
export const DEFAULT_COLOR_COUNT = 3;

export const DEFAULT_COUNTS: Record<ColorName, number> = {
  pink: 5,
  blue: 5,
  yellow: 5,
  green: 5,
  orange: 5,
  purple: 5,
};

export function getDefaultCountsForColors(numColors: number): Record<string, number> {
  const colors = ALL_COLORS.slice(0, Math.min(numColors, MAX_COLORS));
  return Object.fromEntries(colors.map(color => [color, 5]));
}

export const MIN_BALLS_PER_COLOR = 2;
export const MAX_BALLS_PER_COLOR = 15;
export const BALL_RADIUS = 14;

export const PLAYER_RADIUS = 18;
export const PLAYER_MASS = 4; 
export const PLAYER_FRICTION_AIR = 0.12; 
export const PLAYER_RESTITUTION = 0.7; 
export const PLAYER_MAX_FORCE = 0.012; 

export const CIRCLE_RESTITUTION = 0.85; 
export const CIRCLE_FRICTION_AIR = 0.01;
export const CIRCLE_FRICTION = 0.001; 
export const CIRCLE_DENSITY_FACTOR = 0.0008;

export const WALL_RESTITUTION = 0.95; 
export const WALL_FRICTION = 0.05;


export const REPULSION_RANGE = 140; 
export const REPULSION_FORCE = 0.00025;

export const CLUSTER_THRESHOLD = 70; 

export const BOUNDARY_THICKNESS = 60;

