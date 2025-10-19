import type { Body } from "matter-js";
import type { ColorName } from "../types";

export interface CustomBody extends Body {
  circleRadius?: number;
  custom?: {
    id?: string;
    color?: string;
  };
}

export interface CircleBody {
  id: string;
  color: ColorName;
  body: Body;
}
