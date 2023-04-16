import { Button } from "../Button/Button";
import * as Styles from "./styles";

export const GameGuessOverlay = ({
  disabled,
  onNextRound,
  onRestartRoundClick,
  onHighlightPlayerClick,
}: {
  disabled: boolean;
  onNextRound: () => void;
  onRestartRoundClick: () => void;
  onHighlightPlayerClick: () => void;
}) => (
  <Styles.GameGuessOverlay>
    <Styles.GameGuessOverlayDialog>
      <h1>Someone has the answer</h1>

      <Styles.GameGuessOverlayDialogActions>
        <Button disabled={disabled} onClick={onRestartRoundClick}>
          Incorrect Guess
        </Button>
        <Button disabled={disabled} onClick={onNextRound}>
          Correct Guess
        </Button>

        <Button disabled={disabled} onClick={onHighlightPlayerClick}>
          Highlight guessing player
        </Button>
      </Styles.GameGuessOverlayDialogActions>
    </Styles.GameGuessOverlayDialog>
  </Styles.GameGuessOverlay>
);
