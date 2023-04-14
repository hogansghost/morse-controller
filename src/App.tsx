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
  const [message, setMessage] = useState("I love Olga");
  const [running, setRunning] = useState(false);
  const [isControllerConnected, setIsControllerConnected] = useState("");
  const [controllers, setControllers] = useState([]);

  const assignConnectedControllers = () => {
    const gamepads = navigator?.getGamepads() ?? [];
    // @ts-ignore jog on
    const newGP = gamepads
      // @ts-ignore jog on
      .reduce((prev, curr) => {
        return [...prev, curr];
      }, [])
      // @ts-ignore jog on
      .filter(Boolean);

    setControllers(newGP);

    newGP.map(async (controller: GamepadCustom) => {
      vibrateControllerConnected({ controller });
    });
  }

  const connectHandler = () => {
    console.warn("connected");
    assignConnectedControllers();
  };

  const disconnectHandler = () => {
    console.warn("disconnectHandler");
  };

  const scanGamePads = () => {
    const gamepads = navigator?.getGamepads() ?? [];
    console.info("gamepads", gamepads);

    if (gamepads.length) {
      // @ts-ignore jog on
      const newGP = gamepads
        // @ts-ignore jog on
        .reduce((prev, curr) => {
          return [...prev, curr];
        }, [])
        // @ts-ignore jog on
        .filter(Boolean);

      // @ts-ignore jog on
      setControllers(newGP);
    }
  };

  const pause = async (durationMS: number) =>
    new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

    const spaceMorseEvent = () => pause(400);
    const spaceLetters = async () => {
      setMorseText((currentMorseText) => `${currentMorseText} `);
      await pause(950);
    };
    const spaceWord = async () => {
      await pause(950);
      console.log(' / ')
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
    console.log(character)
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
  }

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
