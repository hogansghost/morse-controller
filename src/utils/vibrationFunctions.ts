import { GamepadCustom } from "../types/gamepad.types";
import { vibrateController } from "./vibrateController";

export type MorseEvent = { controller: GamepadCustom | null };

const pause = async (durationMS: number) =>
  new Promise((resolve, _reject) => setTimeout(resolve, durationMS));

export const vibrateControllerConnected = async ({
  controller,
}: MorseEvent) => {
  await vibrateController({
    controller,
    duration: 80,
    weakMagnitude: 0.95,
    strongMagnitude: 0.5,
  });

  await pause(75);

  await vibrateController({
    controller,
    duration: 80,
    weakMagnitude: 0.95,
    strongMagnitude: 0.5,
  });
};

export const vibrationPlayerWin = async ({ controller }: MorseEvent) => {
  await vibrateController({
    controller,
    duration: 80,
    weakMagnitude: 0.95,
    strongMagnitude: 0.5,
  });

  await pause(75);

  await vibrateController({
    controller,
    duration: 120,
    weakMagnitude: 0.95,
    strongMagnitude: 0.75,
  });
};

export const morseDot = async ({ controller }: MorseEvent) =>
  vibrateController({
    controller,
    duration: 150,
    weakMagnitude: 0.75,
    strongMagnitude: 0.25,
  });

export const morseDash = async ({ controller }: MorseEvent) =>
  vibrateController({
    controller,
    duration: 500,
    weakMagnitude: 0.9,
    strongMagnitude: 0.3,
  });
