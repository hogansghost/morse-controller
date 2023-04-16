import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const requestRef = useRef(0);
  const interaction = useRef(false);
  const running = useRef(false);

  // const [interaction, setInteraction] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [morseText, setMorseText] = useState("");
  const [message, setMessage] = useState("aa bb");
  // const [running, setRunning] = useState(false);
  const [isControllerConnected, setIsControllerConnected] = useState(false);
  const [controllers, setControllers] = useState<GamepadCustom[]>([]);

  const listen = async (time: number) => {
    console.log("loop");
    const controllers = ((navigator?.getGamepads() ?? []).filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];
    // controllers2.map((controller: GamepadCustom) => {
    await Promise.all(
      controllers.map((controller: GamepadCustom) => {
        const buttons = controller?.buttons?.some((button) => button.pressed);

        console.log({ buttons: !!buttons, running: running.current})
        if (!!buttons && running.current) {
          interaction.current = true;
          setIsRunning(false);
          setPaused(true);
        }

        if (!!buttons) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
          running.current = false;
          setIsRunning(false);

          vibrateController({
            controller,
            duration: 1200,
            weakMagnitude: 1,
            strongMagnitude: 1,
          });
        }
      })
    );

    requestRef.current = requestAnimationFrame(listen);
  };

  const assignConnectedControllers = () => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ??
      []) as NonNullable<GamepadCustom>[];

    setControllers(detectedGamepads);

    if (!!detectedGamepads.length) {
      detectedGamepads.map(async (controller: GamepadCustom) => {
        vibrateControllerConnected({ controller });
      });
    }
  };

  const connectHandler = () => {
    console.warn("connected");
    setIsControllerConnected(true);
    assignConnectedControllers();
  };

  const disconnectHandler = () => {
    setIsControllerConnected(false);
    console.warn("disconnectHandler");
  };

  const scanGamePads = () => {
    const connectedGamepads = ((navigator?.getGamepads() ?? []).filter(
      Boolean
    ) ?? []) as NonNullable<GamepadCustom>[];

    if (connectedGamepads.length) {
      const detectedGamepads = connectedGamepads.reduce((prev, curr) => {
        return [...prev, curr];
      }, []);

      setControllers(detectedGamepads);
    }
  };

  const pause = async (durationMS: number) =>
    new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

  const spaceMorseEvent = () => pause(400);
  const spaceLetters = async () => {
    await pause(950);

  };
  const spaceWord = async () => {
    // await pause(950);
    console.log(" / ");

    await pause(950);
  };

  const morseCharacter = useCallback(
    async ({
      controller,
      character,
    }: {
      controller: GamepadCustom;
      character: string;
    }) => {
      console.log(character);
      const morseFragments = getMorseCharacterFragments({ character });

      for (const [index, fragment] of morseFragments.entries()) {
        if (running.current && interaction.current) {
          break;
        }

        if (index !== 0) {
          await spaceMorseEvent();
        }

        if (fragment === "-") {
          await morseDash({ controller });
          continue;
        }

        await morseDot({ controller });
      }
    },
    []
  );

  const playBackMorseMessage = useCallback(async () => {
    const morseMap = message.split("");

    for (const character of morseMap) {
      console.log(running.current, !!interaction.current);

      if (!running.current && !!interaction.current) {
        running.current = false;
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;

        break;
      }

      if (character !== " ") {
      setMorseText((currentMorseText) => `${currentMorseText}${character} `);
    }
      if (character === " ") {
        setMorseText((currentMorseText) => `${currentMorseText} / `);
      }

      await Promise.all(
        controllers.map(async (controller: GamepadCustom) => {
          if (!running.current && !!interaction.current) {
            running.current = false;
            setIsRunning(false);
            return;
          }

          if (character === " ") {
            await spaceWord();
            return;
          }

          await morseCharacter({
            controller,
            character,
          });

          await spaceLetters();
        })
      );
    }

    // setRunning(false);
    running.current = false;
    setIsRunning(false);
  }, [controllers]);

  const startRound = (evt: FormEvent<HTMLFormElement>) => {
    console.log(requestRef.current);

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

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
  };

  useEffect(() => {
    if (haveEvents) {
      window.addEventListener("gamepadconnected", connectHandler);
      window.addEventListener("gamepaddisconnected", disconnectHandler);
      // } else if (haveWebkitEvents) {
      // window.addEventListener("webkitgamepadconnected", connectHandler);
      // window.addEventListener("webkitgamepaddisconnected", disconnectHandler);
    } else {
      setInterval(scanGamePads, 500);
    }

    return () => {
      console.warn("end");
    };
  }, []);

  useEffect(() => {
    window.addEventListener("gamepadconnected", connectHandler);

    return () => {
      window.removeEventListener("gamepadconnected", connectHandler);
    };
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(listen);

    return () => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    };
  }, [controllers]);

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
            Continue
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
