import { Ref, useCallback, useRef, useState } from 'react';

type UseDialogReturn = [Ref<HTMLDialogElement>, boolean, () => void, () => void];

export const useDialog = (initialOpenState = false, disableEscClose = false): UseDialogReturn => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isOpen, setIsOpen] = useState(initialOpenState);

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [dialogRef, isOpen, handleOpenDialog, handleCloseDialog];
};
