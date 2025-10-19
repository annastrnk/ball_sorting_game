import type { ColorName } from "../types";

export const COLORS: Record<ColorName, string> = {
  pink: '#ff6fa3',
  blue: '#6fa8ff',
  yellow: '#ffd36f',
  green: '#6fff8f',
  orange: '#ffaa6f',
  purple: '#b86fff',
};

export const COLOR_LABELS: Record<ColorName, string> = {
  pink: 'Pink',
  blue: 'Blue',
  yellow: 'Yellow',
  green: 'Green',
  orange: 'Orange',
  purple: 'Purple',
};

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}