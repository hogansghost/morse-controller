import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { getMorseCharacterFragments } from "./utils/getMorseCharacterFragments";
import { GamepadCustom, vibrateController } from "./utils/vibrateController";
import {
  morseDash,
  morseDot,
  vibrateControllerConnected,
} from "./utils/vibrationFunctions";

function App() {
  const haveEvents = "GamepadEvent" in window;
  const requestAnimationFrame = window.requestAnimationFrame;

  const requestRef = useRef<number | null>(0);
  const interaction = useRef(false);
  const running = useRef(false);
  const _message = useRef("aa bb");

  // const [interaction, setInteraction] = useState(false);
  const [currentGuesser, setCurrentGuesser] = useState<GamepadCustom | null>(null);
  const [paused, setPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [morseText, setMorseText] = useState("");
  const [message, setMessage] = useState("aa bb");
  // const [running, setRunning] = useState(false);
  const [isControllerConnected, setIsControllerConnected] = useState(false);
  const [controllers, setControllers] = useState<GamepadCustom[]>([]);

  const resetGameLoop = () => {
    if (!!requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = null;
  };

  const controllerLogic = async ({
    controller,
  }: {
    controller: GamepadCustom;
  }) => {
    const buttons = controller?.buttons?.some((button) => button.pressed);

    if (!!buttons && running.current) {
      interaction.current = true;
      setIsRunning(false);
      setPaused(true);
      // }

      // if (!!buttons) {
      running.current = false;
      // setIsRunning(false);

      resetGameLoop();

      setCurrentGuesser(controller);

      vibrateController({
        controller,
        duration: 1200,
        weakMagnitude: 1,
        strongMagnitude: 1,
      });
    }
  };

  const listen = async () => {
    await controllerLoop(controllerLogic);
    requestRef.current = requestAnimationFrame(listen);
  };

  const assignConnectedControllers = () => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];
    const detectedGamepadCount = !!detectedGamepads.length;

    setControllers(detectedGamepads);
    setIsControllerConnected(detectedGamepadCount);

    if (detectedGamepadCount) {
      detectedGamepads.map(async (controller: GamepadCustom) => {
        vibrateControllerConnected({ controller });
      });
    }
  };

  const connectHandler = () => {
    assignConnectedControllers();
  };

  const disconnectHandler = () => {
    assignConnectedControllers();
  };

  const pause = async (durationMS: number) =>
    new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

  const spaceMorseEvent = () => pause(400);
  const spaceLetters = async () => {
    await pause(950);
  };
  const spaceWord = async () => {
    await spaceLetters();
    await spaceLetters();
  };

  const controllerLoop = async (controllerCallback: any) => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];

    await Promise.all(
      detectedGamepads.map(async (controller: GamepadCustom) => {
        // await controllerCallback({ controller });
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
    if (!running.current && !!interaction.current) {
      return;
    }

    setMorseText((currentMorseText) => `${currentMorseText}${fragment}`);

    await controllerLoop(controllerEvent);

    await spaceMorseEvent();
  };

  const playBackMorseMessage = async () => {
    const morseMap = _message.current.split("");

    for (const character of morseMap) {
      const morseFragments = getMorseCharacterFragments({ character });

      if (!running.current && !!interaction.current) {
        resetGameLoop();

        running.current = false;
        setIsRunning(false);

        break;
      }

      if (character === " ") {
        setMorseText((currentMorseText) => `${currentMorseText}/ `);
        await spaceWord();
        continue;
      }

      for (const [index, fragment] of morseFragments.entries()) {
        if (running.current && interaction.current) {
          break;
        }

        if (fragment === "-") {
          await morseFragmentLoop({ fragment, controllerEvent: morseDash });
        }

        if (fragment === ".") {
          await morseFragmentLoop({ fragment, controllerEvent: morseDot });
        }
      }

      setMorseText((currentMorseText) => `${currentMorseText} `);
      await spaceLetters();
    }

    // setRunning(false);
    // running.current = false;
    // setIsRunning(false);
  };

  const startRound = (evt: FormEvent<HTMLFormElement>) => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(listen);
    }

    evt.preventDefault();

    // setRunning(true);
    interaction.current = false;
    running.current = true;
    setIsRunning(true);
    setPaused(false);
    setMorseText("");

    playBackMorseMessage();
  };

  const highlightGuessingPlayer = () => {
    if (!currentGuesser) {
      console.error('No current guesser found');
      return;
    }

    vibrateController({
      controller: currentGuesser,
      duration: 1200,
      weakMagnitude: 1,
      strongMagnitude: 1,
    });
  }

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
    _message.current = evt.target.value;
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", connectHandler);

    return () => {
      window.removeEventListener("gamepadconnected", connectHandler);
    };
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(listen);
    console.log("start");
    return () => {
      console.log("end");
      resetGameLoop();
    };
  }, [controllers, message]);

  return (
    <div className="App">
      {isControllerConnected ? (
        <h1>{controllers.length} Controller connected</h1>
      ) : (
        <h1>Connect a controller</h1>
      )}
      {paused && (
        <>
          <h1>Someone has the answer</h1>

          <button type="button" onClick={startRound} disabled={isRunning}>
            Restart round
          </button>

          <button type="button" onClick={highlightGuessingPlayer} disabled={isRunning}>
            Highlight guessing player
          </button>
        </>
      )}

      <p>{morseText}</p>

      <form onSubmit={startRound}>
        <input type="password" value={message} onChange={handleOnChange} />

        <button type="submit" disabled={isRunning}>
          Play
        </button>
      </form>
    </div>
  );
}

export default App;
