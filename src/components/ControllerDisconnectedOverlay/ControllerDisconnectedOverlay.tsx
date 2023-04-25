import * as Styles from "./styles";

export const ControllerDisconnectedOverlay = ({}: {}) => {
  return (
    <Styles.ControllerDisconnectedOverlay>
      <Styles.ControllerDisconnectedOverlayContent>
        Please re-connect your controller(s).
      </Styles.ControllerDisconnectedOverlayContent>
    </Styles.ControllerDisconnectedOverlay>
  );
};
