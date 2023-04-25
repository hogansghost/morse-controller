import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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

function App() {
  const [playSuccessSound] = useSound(SuccessSoundFX);
  const _animationFrame = useRef<number | null>(0);
  const _interaction = useRef(false);
  const _running = useRef(false);
  const _message = useRef("");

  const [guessingController, setGuessingController] =
    useState<GamepadCustom | null>(null);
  const [isPaused, setIsPaused] = useState(false);
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
      setIsPaused(true);
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

    for (const character of morseMap) {
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
    setIsPaused(false);
    setMessageInMorse("");
  };

  const startGameRound = () => {
    resetGameRound();

    playBackMorseMessage();
  };

  const handleRestartRound = () => {
    startGameRound();
  };

  const handleNextRound = () => {
    setIsPaused(false);
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

    return () => {
      window.removeEventListener(
        "gamepadconnected",
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
          disabled={isRunning || !controllers.length}
          onChange={handleOnChange}
          onSubmit={handleStartRound}
        />
      </Styled.AppInput>

      {/* Overlay */}
      {isPaused && (
        <GameGuessOverlay
          disabled={isRunning}
          onNextRound={handleNextRound}
          onRestartRoundClick={handleRestartRound}
          onHighlightPlayerClick={handleHighlightGuessingPlayer}
        />
      )}
    </Styled.App>
  );
}

export default App;
