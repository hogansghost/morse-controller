import { useMemo } from "react";
import { GamepadCustom } from "../../utils/vibrateController";
import { GamepadIcon } from "../icons/ControllerIcon/ControllerIcon";
import * as Styles from "./styles";

export const ControllerList = ({
  controllers,
}: {
  controllers: GamepadCustom[];
}) => {
  const mappedControllers = useMemo(
    () =>
      controllers.map((controller) => ({
        ...controller,
        uid: crypto.randomUUID(),
      })),
    [controllers]
  );

  return (
    <Styles.ControllerList>
      <Styles.ControllerIconList>
        {mappedControllers.map((controller, index) => (
          <Styles.ControllerIconListItem key={controller.uid}>
            <GamepadIcon />
            <p>{index + 1}</p>
          </Styles.ControllerIconListItem>
        ))}
      </Styles.ControllerIconList>
    </Styles.ControllerList>
  );
};
