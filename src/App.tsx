import { ChangeEvent, FormEvent, useEffect, useReducer, useRef, useState } from 'react';
import useSound from 'use-sound';

import SuccessSoundFX from './assets/sounds/success.mp3';
import WinSoundFX from './assets/sounds/win.mp3';

import { ControllerList } from './components/ControllerList/ControllerList';
import { GameGuessDialog } from './components/GameGuessDialog/GameGuessDialog';
import { WordInputForm } from './components/WordInputForm/WordInputForm';
import { GameStateActions, gameDefaultState, gameStateReducer } from './reducers/game';
import { spaceLetters, spaceMorseFragment, spaceWord } from './utils/delays';
import { getMorseCharacterFragments } from './utils/getMorseCharacterFragments';
import { vibrateController } from './utils/vibrateController';

import * as Styled from './styles';

import { useDialog } from './components/Dialog/hooks/useDialog';
import { GameInstructionsDialog } from './components/GameInstructionsDialog/GameInstructionsDialog';
import { IconButton } from './components/IconButton';
import { HelpIcon } from './components/icons/HelpIcon/HelpIcon';
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

        <IconButton aria-label="Game instructions" onClick={handleOpenInstructionsOverlay}>
          <HelpIcon />
        </IconButton>
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

      <GameGuessDialog
        isOpen={isPaused}
        isDisabled={isRunning}
        guessingController={guessingController}
        onNextRound={handleNextRound}
        onRestartRoundClick={handleRestartRound}
      />
    </Styled.App>
  );
}

export default App;
