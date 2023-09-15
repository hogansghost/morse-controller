import { useEffect, useRef } from 'react';
import { GamepadCustom } from '../../types/gamepad.types';
import { vibrateController } from '../../utils/vibrateController';
import { vibrationPlayerWin } from '../../utils/vibrationFunctions';
import { Button } from '../Button';
import { Dialog } from '../Dialog/Dialog';
import { useDialog } from '../Dialog/hooks/useDialog';
import { StyledButtonGroup } from './styles';

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
  const correctGuessButtonRef = useRef(null);

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
      title="Someone has the answer!"
      size="medium"
      focusElement={correctGuessButtonRef}
      isOpen={guessDialogIsOpen}
      disableEscClose
    >
      <Dialog.Body>
        <p>You can check which player buzzed in my pressing the "highlight guessing player" button below.</p>
      </Dialog.Body>

      <Dialog.Footer>
        <StyledButtonGroup>
          <Button disabled={isDisabled} onClick={onRestartRoundClick}>
            Incorrect Guess
          </Button>

          <Button ref={correctGuessButtonRef} disabled={isDisabled} onClick={handleCorrectGuess}>
            Correct Guess
          </Button>

          <Button disabled={isDisabled} onClick={handleHighlightGuesser}>
            Highlight guessing player
          </Button>
        </StyledButtonGroup>
      </Dialog.Footer>
    </Dialog>
  );
};
