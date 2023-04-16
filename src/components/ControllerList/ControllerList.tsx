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
        {mappedControllers.map((controller) => (
          <Styles.ControllerIconListItem key={controller.uid}>
            <GamepadIcon />
          </Styles.ControllerIconListItem>
        ))}
      </Styles.ControllerIconList>

      <p>{controllers.length ?? 0} controllers connected</p>
    </Styles.ControllerList>
  );
};
