import { useCallback, useState } from 'react';

type UseDialogReturn = [boolean, () => void, () => void];

export const useDialog = (initialOpenState = false): UseDialogReturn => {
  const [isOpen, setIsOpen] = useState(initialOpenState);

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, handleOpenDialog, handleCloseDialog];
};
