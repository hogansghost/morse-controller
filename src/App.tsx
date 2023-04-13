import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [morseText, setMorseText] = useState("");
  const [count, setCount] = useState("I love Olga");
  const [loading, setLoading] = useState(false);

  const haveEvents = "GamepadEvent" in window;
  const [controllers, setControllers] = useState([]);

  const connectHandler = () => {
    console.warn("connected");

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

    // @ts-ignore pls
    // vibrate({ type: "dash", intensity: "strong" });
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

    // for (var i = 0; i < gamepads.length; i++) {
    //   // @ts-ignore pls
    //   if (gamepads[i] && gamepads[i].index in controllers) {
    //     // @ts-ignore pls
    //     setControllers(controllers[gamepads[i].index] = gamepads[i];
    //   }
    // }
  };

  const pause = async (durationMS: number) =>
    new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

  const vibrate = useCallback(
    async (
      {
        type,
        intensity,
      }: {
        type?: "dot" | "dash" | "space";
        intensity: "none" | "weak" | "strong";
      } = { type: "space", intensity: "weak" }
    ) => {
      const duration = type === "space" ? "1000" : type === "dot" ? 150 : 500;
      const weakMagnitude =
        intensity === "none" ? 0 : intensity === "weak" ? 0.75 : 0.9;
      const strongMagnitude =
        intensity === "none" ? 0 : intensity === "weak" ? 0.25 : 0.3;

      setMorseText(
        (currentMorseText) =>
          `${currentMorseText}${
            type === "space" ? "  " : type === "dot" ? "." : "-"
          }`
      );

      await Promise.all(
        controllers.map(async (controller) => {
          // @ts-ignore pls
          await controller?.vibrationActuator?.playEffect(controller.vibrationActuator.type, {
            startDelay: 0,
            duration,
            weakMagnitude,
            strongMagnitude,
          });
        })
      );
    },
    [controllers]
  );

  const spaceWord = async () => {
    await pause(950);
    setMorseText((currentMorseText) => `${currentMorseText} / `);
    await pause(950);
  };
  const spaceLetters = async () => {
    setMorseText((currentMorseText) => `${currentMorseText} `);
    await pause(950);
  };
  const spaceMorseEvent = () => pause(400);

  const morseCharacter = async ({ value }) => {
    switch (value.toLocaleLowerCase()) {
      case "a":
        console.log("a");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        return;

      case "b":
        console.log("b");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        return;

      case "c":
        console.log("c");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        return;

      case "d":
        console.log("d");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        return;

      case "e":
        console.log("e");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "f":
        console.log("f");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        return;

      case "g":
        console.log("g");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "h":
        console.log("h");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "i":
        console.log("i");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;
        return;

      case "j":
        console.log("j");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "k":
        console.log("k");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "l":
        console.log("l");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "m":
        console.log("m");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "n":
        console.log("n");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "o":
        console.log("o");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "p":
        console.log("p");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "q":
        console.log("q");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "r":
        console.log("r");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        return;

      case "s":
        console.log("s");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "t":
        console.log("t");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "u":
        console.log("u");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "v":
        console.log("v");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "w":
        console.log("w");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "x":
        console.log("x");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "y":
        console.log("y");

        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "z":
        console.log("z");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        return;

      case "0":
        console.log("0");
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "1":
        console.log("1");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;

      case "2":
        console.log("2");
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dot", intensity: "weak" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        await vibrate({ type: "dash", intensity: "strong" });
        await spaceMorseEvent();
        return;
    }
  };

  const repeatMessage = async (arr) => {
    // @ts-ignore pls
    for (const [index, character] of arr.entries()) {
      if (character.type === "character") {
        if (index !== 0) {
          // Space each letter out comfortably.
          await spaceLetters();
        }

        await morseCharacter(character);

        continue;
      }

      await spaceWord();
      console.log(" ");
    }

    setLoading(false);
  };

  const playBack = async (evt) => {
    evt.preventDefault();

    const morseMap = count.split("");
    // @ts-ignore pls
    const thing = morseMap.reduce((curr, next) => {
      return [
        ...curr,
        {
          type: next === " " ? "space" : "character",
          value: next,
          duration: 100,
        },
      ];
    }, []);

    setLoading(true);
    setMorseText("");

    repeatMessage(thing);
  };

  const handleOnChange = (e) => {
    setCount(e.target.value);
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
      console.warn("end");
    };
  }, []);

  return (
    <div className="App">
      <p>{morseText}</p>

      <form onSubmit={playBack}>
        <input type="password" value={count} onChange={handleOnChange} />

        <button type="submit" disabled={loading}>
          Play
        </button>
      </form>
    </div>
  );
}

export default App;
