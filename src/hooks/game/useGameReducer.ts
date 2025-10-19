import type { ColorName } from "../../types";

export interface GameState {
  gameStarted: boolean;
  counts: Record<string, number>;
  activeColors: ColorName[];
  gamePaused: boolean;
}

export type GameAction =
  | { type: 'START_GAME'; payload: { counts: Record<string, number>; colors: ColorName[] } }
  | { type: 'BACK_TO_CONFIG' }
  | { type: 'RESTART' }
  | { type: 'TOGGLE_PAUSE' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        counts: action.payload.counts,
        activeColors: action.payload.colors,
        gamePaused: false,
      };
    case 'BACK_TO_CONFIG':
      return {
        ...state,
        gameStarted: false,
        gamePaused: false,
      };
    case 'RESTART':
      return {
        ...state,
        gamePaused: false,
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        gamePaused: !state.gamePaused,
      };
    default:
      return state;
  }
}
