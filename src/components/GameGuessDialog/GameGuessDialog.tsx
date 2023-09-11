import { useEffect } from 'react';
import { GamepadCustom } from '../../types/gamepad.types';
import { vibrateController } from '../../utils/vibrateController';
import { vibrationPlayerWin } from '../../utils/vibrationFunctions';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Dialog } from '../Dialog/Dialog';
import { useDialog } from '../Dialog/hooks/useDialog';

export const GameGuessDialog = ({
  isOpen,
  isDisabled,
  guessingController,
  onNextRound,
  onRestartRoundClick,
}: {
  isOpen: boolean;
  isDisabled: boolean;
  guessingController: GamepadCustom | null;
  onNextRound: () => void;
  onRestartRoundClick: () => void;
}) => {
  const [guessDialogRef, guessDialogIsOpen, handleGuessDialogOpen, handleGuessDialogClose] = useDialog();

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

  useEffect(() => {
    if (isOpen) {
      handleGuessDialogOpen();
      return;
    }

    handleGuessDialogClose();
  }, [isOpen]);

  return (
    <Dialog
      ref={guessDialogRef}
      isOpen={guessDialogIsOpen}
      size="medium"
      disableEscClose
      title="Someone has the answer!"
    >
      <Dialog.Body>
        <p>You can check which player buzzed in my pressing the "highlight guessing player" button below.</p>
      </Dialog.Body>

      <Dialog.Footer>
        <ButtonGroup>
          <Button disabled={isDisabled} onClick={onRestartRoundClick}>
            Incorrect Guess
          </Button>

          <Button disabled={isDisabled} onClick={handleCorrectGuess}>
            Correct Guess
          </Button>

          <Button disabled={isDisabled} onClick={handleHighlightGuesser}>
            Highlight guessing player
          </Button>
        </ButtonGroup>
      </Dialog.Footer>
    </Dialog>
  );
};
