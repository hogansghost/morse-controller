import { GameActions, GameStateActions } from "./game.actions";
import { GameState } from "./game.state";

export const gameStateReducer = (state: GameState, action: GameActions) => {
  switch (action.type) {
    case GameStateActions.GAME_STATE_PAUSE: {
      return {
        ...state,
        isPaused: true,
      };
    }
    case GameStateActions.GAME_STATE_RESUME: {
      return {
        ...state,
        isPaused: false,
      };
    }
    case GameStateActions.GAME_LOOP_PAUSE: {
      return {
        ...state,
        isRunning: false,
      };
    }
    case GameStateActions.GAME_LOOP_RESUME: {
      return {
        ...state,
        isRunning: true,
      };
    }
    case GameStateActions.GAME_STATE_PLAYER_GUESS: {
      return {
        ...state,
        isRunning: false,
        isPaused: true,
        noPlayerGuess: false,
        guessingController: action.payload,
      };
    }
    case GameStateActions.GAME_STATE_PLAYER_NO_GUESS: {
      return {
        ...state,
        noPlayerGuess: true,
        guessingController: null,
      };
    }
    case GameStateActions.GAME_ROUND_NEXT: {
      return {
        ...state,
        isPaused: false,
        message: "",
        messageInMorse: "",
      };
    }
    case GameStateActions.GAME_ROUND_RESET: {
      return {
        ...state,
        isRunning: true,
        isPaused: false,
        noPlayerGuess: false,
        messageInMorse: "",
      };
    }
    case GameStateActions.GAME_GUESS_RESET: {
      return {
        ...state,
        noPlayerGuess: false,
        messageInMorse: "",
      };
    }
    case GameStateActions.UPDATE_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case GameStateActions.UPDATE_MORSE_MESSAGE: {
      return {
        ...state,
        messageInMorse: `${state.messageInMorse}${action.payload}`,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
