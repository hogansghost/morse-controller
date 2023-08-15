import { GamepadCustom } from "../../types/gamepad.types";

export enum GameStateActions {
  GAME_STATE_PAUSE = "GameStatePause",
  GAME_STATE_RESUME = "GameStateResume",
  GAME_STATE_PLAYER_GUESS = "GameStatePlayerGuess",
  GAME_STATE_PLAYER_NO_GUESS = "GameStatePlayerNoGuess",
  GAME_LOOP_PAUSE = "GameLoopPause",
  GAME_LOOP_RESUME = "GameLoopResume",
  GAME_ROUND_NEXT = "GameRoundNext",
  GAME_ROUND_RESET = "GameRoundReset",
  GAME_GUESS_RESET = "GameRoundReset",
  UPDATE_MESSAGE = "UpdateMessage",
  UPDATE_MORSE_MESSAGE = "UpdateMorseMessage",
}

export type GameActions =
  | {
      type: GameStateActions.GAME_STATE_PAUSE;
    }
  | {
      type: GameStateActions.GAME_STATE_RESUME;
    }
  | {
      type: GameStateActions.GAME_STATE_PLAYER_GUESS;
      payload: GamepadCustom | null;
    }
  | {
      type: GameStateActions.GAME_STATE_PLAYER_NO_GUESS;
    }
  | {
      type: GameStateActions.GAME_LOOP_PAUSE;
    }
  | {
      type: GameStateActions.GAME_LOOP_RESUME;
    }
  | {
      type: GameStateActions.GAME_ROUND_NEXT;
    }
  | {
      type: GameStateActions.GAME_ROUND_RESET;
    }
  | {
      type: GameStateActions.GAME_GUESS_RESET;
    }
  | {
      type: GameStateActions.UPDATE_MORSE_MESSAGE;
      payload: string;
    }
  | {
      type: GameStateActions.UPDATE_MESSAGE;
      payload: string;
    };
