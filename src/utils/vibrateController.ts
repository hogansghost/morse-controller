import { GamepadCustom } from "../types/gamepad.types";

export const vibrateController = ({
  controller,
  startDelay = 0,
  duration,
  weakMagnitude,
  strongMagnitude,
}: {
  controller: GamepadCustom | null;
  startDelay?: number;
  duration: number;
  weakMagnitude: number;
  strongMagnitude: number;
}) => {
  if (!controller) {
    console.error("Controller not found.");
    return;
  }

  return controller.vibrationActuator?.playEffect(
    controller.vibrationActuator?.type ?? "dual-rumble",
    {
      startDelay,
      duration,
      weakMagnitude,
      strongMagnitude,
    }
  );
};
