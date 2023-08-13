import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import useSound from "use-sound";
import SuccessSoundFX from "./assets/sounds/success.mp3";
import { ControllerDisconnectedOverlay } from "./components/ControllerDisconnectedOverlay/ControllerDisconnectedOverlay";
import { ControllerList } from "./components/ControllerList/ControllerList";
import { GameGuessOverlay } from "./components/GameGuessOverlay/GameGuessOverlay";
import { WordInputForm } from "./components/WordInputForm/WordInputForm";
import * as Styled from "./styles";
import { spaceLetters, spaceMorseFragment, spaceWord } from "./utils/delays";
import { getMorseCharacterFragments } from "./utils/getMorseCharacterFragments";
import { GamepadCustom, vibrateController } from "./utils/vibrateController";
import {
  morseDash,
  morseDot,
  vibrateControllerConnected,
} from "./utils/vibrationFunctions";

enum GameStateActions {
  PAUSE_GAME = "PauseGame",
  RESUME_GAME = "ResumeGame",
}

type GameActions =
  | {
      type: GameStateActions.PAUSE_GAME;
    }
  | {
      type: GameStateActions.RESUME_GAME;
    };

interface GameState {
  isPaused: boolean;
}

const gameStateReducer = (state: GameState, action: GameActions) => {
  switch (action.type) {
    case GameStateActions.PAUSE_GAME: {
      return {
        ...state,
        isPaused: true,
      };
    }
    case GameStateActions.RESUME_GAME: {
      return {
        ...state,
        isPaused: false,
      };
    }
  }
};

function App() {
  const [{ isPaused }, dispatch] = useReducer(gameStateReducer, {
    isPaused: false,
  });

  const [playSuccessSound] = useSound(SuccessSoundFX);
  const _animationFrame = useRef<number | null>(0);
  const _interaction = useRef(false);
  const _running = useRef(false);
  const _message = useRef("");

  const [guessingController, setGuessingController] =
    useState<GamepadCustom | null>(null);
  const [noGuess, setNoGuess] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [messageInMorse, setMessageInMorse] = useState("");
  const [message, setMessage] = useState("");
  const [controllers, setControllers] = useState<GamepadCustom[]>([]);

  const assignConnectedControllers = () => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];
    const detectedGamepadCount = !!detectedGamepads.length;

    setControllers(detectedGamepads);

    if (detectedGamepadCount) {
      detectedGamepads.map(async (controller: GamepadCustom) => {
        vibrateControllerConnected({ controller });
      });
    }
  };

  const connectControllerHandler = () => {
    assignConnectedControllers();
  };

  const disconnectControllerHandler = () => {
    console.log("disconnected");
    assignConnectedControllers();
  };

  const gameResetLoop = () => {
    if (!!_animationFrame.current) {
      cancelAnimationFrame(_animationFrame.current);
    }

    _animationFrame.current = null;
  };

  const controllerInteraction = async ({
    controller,
  }: {
    controller: GamepadCustom;
  }) => {
    const buttons = controller?.buttons?.some((button) => button.pressed);

    if (!!buttons && _running.current) {
      _interaction.current = true;
      _running.current = false;

      playSuccessSound();

      setIsRunning(false);
      dispatch({ type: GameStateActions.PAUSE_GAME });
      setGuessingController(controller);

      gameResetLoop();

      vibrateController({
        controller,
        duration: 1200,
        weakMagnitude: 1,
        strongMagnitude: 1,
      });
    }
  };

  const gameRequestAnimationLoop = async () => {
    await controllerLoop(controllerInteraction);

    _animationFrame.current = window.requestAnimationFrame(
      gameRequestAnimationLoop
    );
  };

  const controllerLoop = async (controllerCallback: any) => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];

    await Promise.all(
      detectedGamepads.map(async (controller: GamepadCustom) => {
        await controllerCallback({ controller });
      })
    );
  };

  const morseFragmentLoop = async ({
    fragment,
    controllerEvent,
  }: {
    fragment: string;
    controllerEvent: any;
  }) => {
    if (!_running.current && !!_interaction.current) {
      return;
    }

    setMessageInMorse((currentMorseText) => `${currentMorseText}${fragment}`);

    await controllerLoop(controllerEvent);

    await spaceMorseFragment();
  };

  const playBackMorseMessage = async () => {
    const morseMap = _message.current.split("");

    for (const [index, character] of morseMap.entries()) {
      const morseFragments = getMorseCharacterFragments({ character });

      if (!_running.current && !!_interaction.current) {
        gameResetLoop();

        _running.current = false;
        setIsRunning(false);

        break;
      }

      if (character === " ") {
        setMessageInMorse((currentMorseText) => `${currentMorseText}/ `);
        await spaceWord();
        continue;
      }

      for (const fragment of morseFragments) {
        if (_running.current && _interaction.current) {
          break;
        }

        if (fragment === "-") {
          await morseFragmentLoop({ fragment, controllerEvent: morseDash });
        }

        if (fragment === ".") {
          await morseFragmentLoop({ fragment, controllerEvent: morseDot });
        }
      }

      setMessageInMorse((currentMorseText) => `${currentMorseText} `);

      await spaceLetters();

      if (index === morseMap.length - 1) {
        setNoGuess(true);
      }
    }
  };

  const resetGameRound = () => {
    if (!_animationFrame.current) {
      _animationFrame.current = window.requestAnimationFrame(
        gameRequestAnimationLoop
      );
    }

    _interaction.current = false;
    _running.current = true;

    setIsRunning(true);
    dispatch({ type: GameStateActions.RESUME_GAME });
    setMessageInMorse("");
  };

  const startGameRound = () => {
    resetGameRound();

    setNoGuess(false);

    playBackMorseMessage();
  };

  const handleRestartRound = () => {
    startGameRound();
  };

  const handleNextRound = () => {
    dispatch({ type: GameStateActions.RESUME_GAME });
    setMessageInMorse("");
    setMessage("");
    _message.current = "";
  };

  const handleStartRound = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!message.length) {
      return;
    }

    startGameRound();
  };

  const handleReplayMessage = () => {
    setNoGuess(false);
    setMessageInMorse("");
    playBackMorseMessage();
  };

  const handleHighlightGuessingPlayer = () => {
    if (!guessingController) {
      console.error("No current guesser found");
      return;
    }

    vibrateController({
      controller: guessingController,
      duration: 1200,
      weakMagnitude: 1,
      strongMagnitude: 1,
    });
  };

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    _message.current = evt.target.value;
    setMessage(evt.target.value);
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", connectControllerHandler);
    window.addEventListener("gamepaddisconnected", disconnectControllerHandler);

    return () => {
      window.removeEventListener("gamepadconnected", connectControllerHandler);
      window.removeEventListener(
        "gamepaddisconnected",
        disconnectControllerHandler
      );
    };
  }, []);

  useEffect(() => {
    _animationFrame.current = window.requestAnimationFrame(
      gameRequestAnimationLoop
    );

    return () => {
      gameResetLoop();
    };
  }, [controllers, message]);

  useEffect(() => {
    if (controllers.length) {
      playSuccessSound();
    }
  }, [controllers]);
  console.log(controllers);
  return (
    <Styled.App>
      <Styled.AppController>
        <ControllerList controllers={controllers} />
      </Styled.AppController>

      <Styled.AppRoundControls>
        {!controllers.length && <ControllerDisconnectedOverlay />}

        <p>{messageInMorse}</p>
      </Styled.AppRoundControls>

      <Styled.AppInput>
        <WordInputForm
          message={message}
          isDisabled={isRunning || !controllers.length}
          canReplayMessage={isRunning && noGuess}
          onChange={handleOnChange}
          onSubmit={handleStartRound}
          onReplay={handleReplayMessage}
        />
      </Styled.AppInput>

      {/* Overlay */}
      {isPaused && (
        <GameGuessOverlay
          isDisabled={isRunning}
          onNextRound={handleNextRound}
          onRestartRoundClick={handleRestartRound}
          onHighlightPlayerClick={handleHighlightGuessingPlayer}
        />
      )}
    </Styled.App>
  );
}

export default App;
