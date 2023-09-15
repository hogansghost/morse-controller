import { ForwardedRef, forwardRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon/CloseIcon';
import { StyledDialog, StyledDialogContent, StyledDialogHeader, StyledDialogTitle } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const DialogSection: React.FC<any> = ({ className, children, fullWidth, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const DialogComponent = forwardRef<HTMLDialogElement, DialogProps>(
  (
    { children, isOpen, disableEscClose = false, size = 'small', title, onDismiss, ...props },
    ref?: ForwardedRef<HTMLDialogElement>
  ) => {
    const handleOnEscClose = useCallback((evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
      }

      if (evt.key === 'Escape' && !disableEscClose && onDismiss) {
        onDismiss();
      }
    }, []);

    useEffect(() => {
      if (typeof ref !== 'function' && ref?.current) {
        ref.current.showModal();
      }
    }, []);

    useEffect(() => {
      if (typeof ref !== 'function' && ref?.current) {
        ref.current.addEventListener('keydown', handleOnEscClose);
      }

      return () => {
        if (typeof ref !== 'function' && ref?.current) {
          ref.current.removeEventListener('keydown', handleOnEscClose);
        }
      };
    }, [handleOnEscClose]);

    return createPortal(
      // @ts-expect-error ref types from styled components and forwardRef
      <StyledDialog ref={ref} $size={size} {...props}>
        <StyledDialogContent>
          {(title || onDismiss) && (
            <StyledDialogHeader>
              {title && <StyledDialogTitle>{title}</StyledDialogTitle>}

              {onDismiss && (
                <IconButton aria-label="Close dialog" onClick={onDismiss}>
                  <CloseIcon />
                </IconButton>
              )}
            </StyledDialogHeader>
          )}

          {children}
        </StyledDialogContent>
      </StyledDialog>,
      document.body
    );
  }
);

const DialogWrapper = forwardRef<HTMLDialogElement, DialogProps>(
  ({ isOpen, title, ...props }, ref?: ForwardedRef<HTMLDialogElement>) => {
    return isOpen ? (
      // @ts-expect-error ref types from styled components and forwardRef
      <DialogComponent ref={ref} title={title} isOpen={isOpen} {...props} />
    ) : null;
  }
);

export const Dialog = Object.assign(DialogWrapper, {
  Body: DialogSection,
  Footer: DialogSection,
});
