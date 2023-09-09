import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import useSound from 'use-sound';

import SuccessSoundFX from './assets/sounds/success.mp3';
import WinSoundFX from './assets/sounds/win.mp3';

import { ControllerList } from './components/ControllerList/ControllerList';
import { GameGuessOverlay } from './components/GameGuessOverlay/GameGuessOverlay';
import { WordInputForm } from './components/WordInputForm/WordInputForm';
import { GameStateActions, gameDefaultState, gameStateReducer } from './reducers/game';
import { spaceLetters, spaceMorseFragment, spaceWord } from './utils/delays';
import { getMorseCharacterFragments } from './utils/getMorseCharacterFragments';
import { vibrateController } from './utils/vibrateController';

import * as Styled from './styles';

import { useDialog } from './components/Dialog/hooks/useDialog';
import { GameInstructionsDialog } from './components/GameInstructionsDialog/GameInstructionsDialog';
import { GamepadCustom } from './types/gamepad.types';
import { morseDash, morseDot, vibrateControllerConnected } from './utils/vibrationFunctions';

function App() {
  const [{ isRunning, isPaused, noPlayerGuess, message, messageInMorse, guessingController }, dispatch] = useReducer(
    gameStateReducer,
    gameDefaultState
  );

  const [playSuccessSound] = useSound(SuccessSoundFX);
  const [playWinSound, { stop: stopWinSound }] = useSound(WinSoundFX);

  const _animationFrame = useRef<number | null>(0);
  const _interaction = useRef(false);
  const _running = useRef(false);
  const _message = useRef('');

  const [controllers, setControllers] = useState<GamepadCustom[]>([]);
  const [
    instructionDialogRef,
    isInstructionDialoglayOpen,
    handleOpenInstructionsOverlay,
    handleCloseInstructionsDialog,
  ] = useDialog();

  const assignConnectedControllers = () => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ?? []) as NonNullable<GamepadCustom>[];
    const detectedGamepadCount = !!detectedGamepads.length;

    setControllers(detectedGamepads);

    if (detectedGamepadCount) {
      detectedGamepads.map(async (controller: GamepadCustom) => {
        vibrateControllerConnected({ controller });
      });
    }
  };

  const connectControllerHandler = () => {
    assignConnectedControllers();
  };

  const disconnectControllerHandler = () => {
    console.warn('Controllers disconnected');
    assignConnectedControllers();
  };

  const gameResetLoop = () => {
    if (!!_animationFrame.current) {
      cancelAnimationFrame(_animationFrame.current);
    }

    _animationFrame.current = null;
  };

  const controllerInteraction = async ({ controller }: { controller: GamepadCustom }) => {
    const buttons = controller?.buttons?.some((button) => button.pressed);

    if (!!buttons && _running.current) {
      _interaction.current = true;
      _running.current = false;

      playSuccessSound();

      dispatch({
        type: GameStateActions.GAME_STATE_PLAYER_GUESS,
        payload: controller,
      });

      gameResetLoop();

      vibrateController({
        controller,
        duration: 1000,
        weakMagnitude: 1,
        strongMagnitude: 0.8,
      });
    }
  };

  const gameRequestAnimationLoop = async () => {
    await controllerLoop(controllerInteraction);

    _animationFrame.current = window.requestAnimationFrame(gameRequestAnimationLoop);
  };

  const controllerLoop = async (controllerCallback: any) => {
    const detectedGamepads = (navigator?.getGamepads().filter(Boolean) ?? []) as NonNullable<GamepadCustom>[];

    await Promise.all(
      detectedGamepads.map(async (controller: GamepadCustom) => {
        await controllerCallback({ controller });
      })
    );
  };

  const morseFragmentLoop = async ({ fragment, controllerEvent }: { fragment: string; controllerEvent: any }) => {
    if (!_running.current && !!_interaction.current) {
      return;
    }

    dispatch({
      type: GameStateActions.UPDATE_MORSE_MESSAGE,
      payload: fragment,
    });

    await controllerLoop(controllerEvent);

    await spaceMorseFragment();
  };

  const playBackMorseMessage = async () => {
    const morseMap = _message.current.split('');

    for (const [index, character] of morseMap.entries()) {
      const morseFragments = getMorseCharacterFragments({ character });

      if (!_running.current && !!_interaction.current) {
        gameResetLoop();

        _running.current = false;
        dispatch({ type: GameStateActions.GAME_LOOP_PAUSE });

        break;
      }

      if (character === ' ') {
        dispatch({ type: GameStateActions.UPDATE_MORSE_MESSAGE, payload: '/' });
        await spaceWord();
        continue;
      }

      for (const fragment of morseFragments) {
        if (_running.current && _interaction.current) {
          break;
        }

        if (fragment === '-') {
          await morseFragmentLoop({ fragment, controllerEvent: morseDash });
        }

        if (fragment === '.') {
          await morseFragmentLoop({ fragment, controllerEvent: morseDot });
        }
      }

      dispatch({ type: GameStateActions.UPDATE_MORSE_MESSAGE, payload: ' ' });

      await spaceLetters();

      if (index === morseMap.length - 1) {
        dispatch({
          type: GameStateActions.GAME_STATE_PLAYER_NO_GUESS,
        });
      }
    }
  };

  const resetGameRound = () => {
    if (!_animationFrame.current) {
      _animationFrame.current = window.requestAnimationFrame(gameRequestAnimationLoop);
    }

    _interaction.current = false;
    _running.current = true;

    dispatch({ type: GameStateActions.GAME_ROUND_RESET });
  };

  const startGameRound = () => {
    resetGameRound();

    playBackMorseMessage();
  };

  const handleRestartRound = () => {
    startGameRound();
  };

  const handleNextRound = () => {
    playWinSound();

    _message.current = '';

    dispatch({ type: GameStateActions.GAME_ROUND_NEXT });
  };

  const handleStartRound = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    stopWinSound();

    if (!message.length) {
      console.error('No message found');
      return;
    }

    startGameRound();
  };

  const handleReplayMessage = () => {
    dispatch({ type: GameStateActions.GAME_GUESS_RESET });

    playBackMorseMessage();
  };

  const handleOnChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = evt.target.value;

    dispatch({
      type: GameStateActions.UPDATE_MESSAGE,
      payload: newMessage,
    });

    _message.current = newMessage;
  };

  useEffect(() => {
    _animationFrame.current = window.requestAnimationFrame(gameRequestAnimationLoop);

    return () => {
      gameResetLoop();
    };
  }, [controllers, message]);

  useEffect(() => {
    if (controllers.length) {
      playSuccessSound();
    }
  }, [controllers]);

  useEffect(() => {
    window.addEventListener('gamepadconnected', connectControllerHandler);
    window.addEventListener('gamepaddisconnected', disconnectControllerHandler);

    return () => {
      window.removeEventListener('gamepadconnected', connectControllerHandler);
      window.removeEventListener('gamepaddisconnected', disconnectControllerHandler);
    };
  }, []);

  return (
    <Styled.App>
      <Styled.AppController>
        <ControllerList controllers={controllers} />

        {/**
         *
         * TODO: make an icon button component.
         * TODO: make a dialog component (accessibilty, use a lib?).
         * TODO: Port all overlays to Dialog component.
         * TODO: make a help icon component.
         * TODO: Improve instructions.
         * TODO: Research best practise for svg icons - inline is bloat.
         * TODO: Research partykit to make this online coop.
         */}

        <button
          style={{ padding: '8px', border: 0, borderRadius: '50%' }}
          aria-label="Game instructions"
          type="button"
          onClick={handleOpenInstructionsOverlay}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.999 92" style={{ height: '1em', width: '1em' }}>
            <path
              fill="currentColor"
              d="M45.385.004C19.982.344-.334 21.215.004 46.619c.34 25.393 21.209 45.715 46.611 45.377 25.398-.342 45.718-21.213 45.38-46.615-.34-25.395-21.21-45.716-46.61-45.377zM45.249 74l-.254-.004c-3.912-.116-6.67-2.998-6.559-6.852.109-3.788 2.934-6.538 6.717-6.538l.227.004c4.021.119 6.748 2.972 6.635 6.937C51.903 71.346 49.122 74 45.249 74zm16.455-32.659c-.92 1.307-2.943 2.93-5.492 4.916l-2.807 1.938c-1.541 1.198-2.471 2.325-2.82 3.434-.275.873-.41 1.104-.434 2.88l-.004.451H39.429l.031-.907c.131-3.728.223-5.921 1.768-7.733 2.424-2.846 7.771-6.289 7.998-6.435.766-.577 1.412-1.234 1.893-1.936 1.125-1.551 1.623-2.772 1.623-3.972a7.74 7.74 0 0 0-1.471-4.576c-.939-1.323-2.723-1.993-5.303-1.993-2.559 0-4.311.812-5.359 2.478-1.078 1.713-1.623 3.512-1.623 5.35v.457H27.935l.02-.477c.285-6.769 2.701-11.643 7.178-14.487C37.946 18.918 41.446 18 45.53 18c5.346 0 9.859 1.299 13.412 3.861 3.6 2.596 5.426 6.484 5.426 11.556 0 2.837-.896 5.502-2.664 7.924z"
            />
          </svg>
        </button>
      </Styled.AppController>

      <Styled.AppRoundControls>
        <p>{messageInMorse}</p>
      </Styled.AppRoundControls>

      <Styled.AppInput>
        <WordInputForm
          message={message}
          isDisabled={isRunning || !controllers.length}
          canReplayMessage={isRunning && noPlayerGuess}
          onChange={handleOnChange}
          onSubmit={handleStartRound}
          onReplay={handleReplayMessage}
        />
      </Styled.AppInput>

      {/* Overlays */}
      {/* {!controllers.length && <ControllerDisconnectedOverlay />} */}

      <GameInstructionsDialog
        ref={instructionDialogRef}
        isOpen={isInstructionDialoglayOpen}
        onDismiss={handleCloseInstructionsDialog}
      />

      {isPaused && (
        <GameGuessOverlay
          isDisabled={isRunning}
          guessingController={guessingController}
          onNextRound={handleNextRound}
          onRestartRoundClick={handleRestartRound}
        />
      )}
    </Styled.App>
  );
}

export default App;
