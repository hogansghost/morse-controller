// TS GamepadHapticActuator is missing the non-standard vibrationActuator
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/vibrationActuator
export type GamepadCustom = Gamepad & {
  type: GamepadHapticActuator["type"] | "dual-rumble";
  vibrationActuator: any;
};

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
