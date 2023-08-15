interface GamepadCustomVibration {
  type: GamepadHapticActuator["type"] | "dual-rumble";
  vibrationActuator: any;
}

// TS GamepadHapticActuator is missing the non-standard vibrationActuator
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/vibrationActuator
export type GamepadCustom = Gamepad & GamepadCustomVibration;

// TS GamepadHapticActuator is missing the non-standard vibrationActuator
// https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/vibrationActuator
export interface GamepadEventCustom extends Event {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GamepadEvent/gamepad) */
  readonly gamepad: GamepadCustom;
}
