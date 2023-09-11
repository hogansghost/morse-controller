import { ForwardedRef, forwardRef } from 'react';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup';
import { Dialog } from '../Dialog/Dialog';
import { DialogCommonProps } from '../Dialog/Dialog.types';

export const GameInstructionsDialog = forwardRef<HTMLDialogElement, DialogCommonProps>(
  ({ isOpen, onDismiss }, ref?: ForwardedRef<HTMLDialogElement>) => (
    <Dialog ref={ref} isOpen={isOpen} size="medium" disableEscClose={false} title="Instructions" onDismiss={onDismiss}>
      <Dialog.Body>
        <p>Connect up to 4 Xbox controllers</p>
        <p>One player will control the game by typing a word into the input field below and then clicking play.</p>
        <p>
          All connceted controllers will begin to vibrate morse code to represent the word or sentence entered by the
          game master.
        </p>
        <p>Any player can now press any button to pause the game and make a guess.</p>
        <p>If the player guesses correctly, the game master can select to start a new game.</p>
        <p>
          If the player guesses incorrectly, the game master can restart the round where the morse code vibrations will
          start from the beginning again allowing players to guess again.
        </p>
        <p>
          If no one has a guess, you can restart the morse code vibration playback by clicking the "restart" button next
          to the message input field.
        </p>
      </Dialog.Body>

      <Dialog.Footer>
        <ButtonGroup>
          <Button onClick={onDismiss}>Close instructions</Button>
        </ButtonGroup>
      </Dialog.Footer>
    </Dialog>
  )
);
