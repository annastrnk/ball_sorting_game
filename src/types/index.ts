export type ColorName = 'pink' | 'blue' | 'yellow' | 'green' | 'orange' | 'purple';

export const ALL_COLORS: ColorName[] = ['pink', 'blue', 'yellow', 'green', 'orange', 'purple'];

export interface GameCircle {
  id: string;
  color: ColorName;
  radius: number;
}

export interface GameConfig {
  counts: Record<string, number>; 
  width: number;
  height: number;
  activeColors: ColorName[];
}