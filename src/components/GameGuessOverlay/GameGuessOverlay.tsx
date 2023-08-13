import { Button } from "../Button/Button";
import * as Styles from "./styles";

export const GameGuessOverlay = ({
  isDisabled,
  onNextRound,
  onRestartRoundClick,
  onHighlightPlayerClick,
}: {
  isDisabled: boolean;
  onNextRound: () => void;
  onRestartRoundClick: () => void;
  onHighlightPlayerClick: () => void;
}) => (
  <Styles.GameGuessOverlay>
    <Styles.GameGuessOverlayDialog>
      <h1>Someone has the answer</h1>

      <Styles.GameGuessOverlayDialogActions>
        <Button disabled={isDisabled} onClick={onRestartRoundClick}>
          Incorrect Guess
        </Button>
        <Button disabled={isDisabled} onClick={onNextRound}>
          Correct Guess
        </Button>

        <Button disabled={isDisabled} onClick={onHighlightPlayerClick}>
          Highlight guessing player
        </Button>
      </Styles.GameGuessOverlayDialogActions>
    </Styles.GameGuessOverlayDialog>
  </Styles.GameGuessOverlay>
);
