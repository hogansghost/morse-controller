import {
  GamepadCustom,
  vibrateController,
} from "../../utils/vibrateController";
import { vibrationPlayerWin } from "../../utils/vibrationFunctions";
import { Button } from "../Button/Button";
import * as Styles from "./styles";

export const GameGuessOverlay = ({
  isDisabled,
  guessingController,
  onNextRound,
  onRestartRoundClick,
}: {
  isDisabled: boolean;
  guessingController: GamepadCustom | null;
  onNextRound: () => void;
  onRestartRoundClick: () => void;
}) => {
  const handleHighlightGuesser = () =>
    vibrateController({
      controller: guessingController,
      duration: 800,
      weakMagnitude: 1,
      strongMagnitude: 0.8,
    });

  const handleCorrectGuess = () => {
    vibrationPlayerWin({ controller: guessingController });

    onNextRound();
  };

  return (
    <Styles.GameGuessOverlay>
      <Styles.GameGuessOverlayDialog>
        <h1>Someone has the answer!</h1>

        <Styles.GameGuessOverlayDialogActions>
          <Button disabled={isDisabled} onClick={onRestartRoundClick}>
            Incorrect Guess
          </Button>

          <Button disabled={isDisabled} onClick={handleCorrectGuess}>
            Correct Guess
          </Button>

          <Button disabled={isDisabled} onClick={handleHighlightGuesser}>
            Highlight guessing player
          </Button>
        </Styles.GameGuessOverlayDialogActions>
      </Styles.GameGuessOverlayDialog>
    </Styles.GameGuessOverlay>
  );
};
