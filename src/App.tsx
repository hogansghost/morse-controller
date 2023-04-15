import { useEffect, useState } from "react";
import "./App.css";
import { getMorseCharacterFragments } from "./utils/getMorseCharacterFragments";
import { GamepadCustom } from "./utils/vibrateController";
import {
  morseDash,
  morseDot,
  vibrateControllerConnected,
} from "./utils/vibrationFunctions";

function App() {
  const haveEvents = "GamepadEvent" in window;

  const [morseText, setMorseText] = useState("");
  const [message, setMessage] = useState("aa bb");
  const [running, setRunning] = useState(false);
  const [isControllerConnected, setIsControllerConnected] = useState(false);
  const [controllers, setControllers] = useState<GamepadCustom[]>([]);

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
    const connectedGamepads = navigator?.getGamepads() ?? [];

    if (connectedGamepads.length) {
      const detectedGamepads = connectedGamepads
        .filter(Boolean)
        .reduce((prev, curr) => {
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
    setMorseText((currentMorseText) => `${currentMorseText} `.trim());
  };
  const spaceWord = async () => {
    // await pause(950);
    console.log(" / ");
    setMorseText((currentMorseText) => `${currentMorseText} / `);
    await pause(950);
  };

  const morseCharacter = async ({
    controller,
    character,
  }: {
    controller: GamepadCustom;
    character: string;
  }) => {
    console.log(character);
    const morseFragments = getMorseCharacterFragments({ character });

    for (const [index, fragment] of morseFragments.entries()) {
      if (index !== 0) {
        await spaceMorseEvent();
      }

      setMorseText((currentMorseText) => `${currentMorseText}${fragment}`);

      if (fragment === "-") {
        await morseDash({ controller });
        continue;
      }

      await morseDot({ controller });
    }
  };

  const playBackMorseMessage = async () => {
    const morseMap = message.split("");

    setRunning(true);
    setMorseText("");

    for (const character of morseMap) {
      await Promise.all(
        controllers.map(async (controller: GamepadCustom) => {
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

    setRunning(false);
  };

  const startRound = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    playBackMorseMessage();
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="App">
      <p>{morseText}</p>

      <form onSubmit={startRound}>
        <input type="password" value={message} onChange={handleOnChange} />

        <button type="submit" disabled={running}>
          Play
        </button>
      </form>
    </div>
  );
}

export default App;
