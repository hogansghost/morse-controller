import { Ref, useCallback, useEffect, useRef, useState } from 'react';

type UseDialogReturn = [Ref<HTMLDialogElement>, boolean, () => void, () => void];

export const useDialog = (initialOpenState: boolean = false): UseDialogReturn => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isOpen, setIsOpen] = useState(initialOpenState);

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);

    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [dialogRef]);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.addEventListener('close', handleCloseDialog);
    }

    return () => {
      if (dialogRef.current) {
        dialogRef.current.removeEventListener('close', handleCloseDialog);
      }
    };
  }, []);

  return [dialogRef, isOpen, handleOpenDialog, handleCloseDialog];
};
