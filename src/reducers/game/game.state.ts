import { GamepadCustom } from "../utils/vibrateController";

export interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  noPlayerGuess: boolean;
  messageInMorse: string;
  message: string;
  guessingController: GamepadCustom | null;
}

export const gameDefaultState = {
  isRunning: false,
  isPaused: false,
  noPlayerGuess: false,
  message: "",
  messageInMorse: "",
  guessingController: null,
};
