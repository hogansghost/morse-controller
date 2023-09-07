import { Button } from "../Button/Button";
import * as Styles from "./styles";

export const GameInstructionsOverlay = ({
  onClose,
}: {
  onClose: () => void;
}) => (
  <Styles.GameInstructionsOverlay>
    <Styles.GameInstructionsOverlayDialog>
      <h1>Instructions</h1>

      <p>Connect up to 4 Xbox controllers</p>
      <p>
        One player will control the game by typing a word into the input field
        below and then clicking play.
      </p>
      <p>
        All connceted controllers will begin to vibrate morse code to represent
        the word or sentence entered by the game master.
      </p>
      <p>
        Any player can now press any button to pause the game and make a guess.
      </p>
      <p>
        If the player guesses correctly, the game master can select to start a
        new game.
      </p>
      <p>
        If the player guesses incorrectly, the game master can restart the round
        where the morse code vibrations will start from the beginning again
        allowing players to guess again.
      </p>
      <p>
        If no one has a guess, you can restart the morse code vibration playback
        by clicking the "restart" button next to the message input field.
      </p>

      <Styles.GameInstructionsOverlayDialogActions>
        <Button onClick={onClose}>Close instructions</Button>
      </Styles.GameInstructionsOverlayDialogActions>
    </Styles.GameInstructionsOverlayDialog>
  </Styles.GameInstructionsOverlay>
);
