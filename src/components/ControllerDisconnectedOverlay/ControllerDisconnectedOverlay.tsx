import { useEffect } from 'react';
import { Dialog } from '../Dialog/Dialog';
import { useDialog } from '../Dialog/hooks/useDialog';
import { StyledTitle } from './styles';

export const ControllerDisconnectedOverlay = ({ isOpen }: { isOpen: boolean }) => {
  const [
    controllerDisconnectedDialogRef,
    controllerDisconnectedDialogIsOpen,
    handleControllerDisconnectedDialogOpen,
    handleControllerDisconnectedDialogClose,
  ] = useDialog();

  useEffect(() => {
    if (isOpen) {
      handleControllerDisconnectedDialogOpen();
      return;
    }

    handleControllerDisconnectedDialogClose();
  }, [isOpen]);

  return (
    <Dialog
      ref={controllerDisconnectedDialogRef}
      size="fullWidth"
      isOpen={controllerDisconnectedDialogIsOpen}
      disableEscClose
    >
      <StyledTitle>Please connect your controller(s)</StyledTitle>
    </Dialog>
  );
};
