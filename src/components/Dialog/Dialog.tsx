import { ForwardedRef, forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '../IconButton';
import { CloseIcon } from '../icons/CloseIcon/CloseIcon';
import { StyledDialog, StyledDialogContent, StyledDialogHeader } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

export const DialogSection: React.FC<any> = ({ className, children, fullWidth, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const DialogWrapper = forwardRef<HTMLDialogElement, DialogProps>(
  (
    { children, isOpen, disableEscClose = false, size = 'small', title, onDismiss, ...props },
    ref?: ForwardedRef<HTMLDialogElement>
  ) => {
    const handleOnEscClose = (evt: KeyboardEvent) => {
      if (disableEscClose && evt.key === 'Escape') {
        evt.preventDefault();
      }
    };

    useEffect(() => {
      if (typeof ref !== 'function' && ref?.current) {
        ref.current?.addEventListener('keydown', handleOnEscClose);
      }

      return () => {
        if (typeof ref !== 'function' && ref?.current) {
          ref.current?.removeEventListener('keydown', handleOnEscClose);
        }
      };
    }, [handleOnEscClose]);

    return createPortal(
      // @ts-expect-error ref types from styled components and forwardRef
      <StyledDialog ref={ref} $size={size} {...props}>
        <StyledDialogContent>
          <StyledDialogHeader>
            {title && <h1>{title}</h1>}

            {onDismiss && (
              <IconButton aria-label="Close dialog" onClick={onDismiss}>
                <CloseIcon />
              </IconButton>
            )}
          </StyledDialogHeader>

          {children}
        </StyledDialogContent>
      </StyledDialog>,
      document.body
    );
  }
);

export const Dialog = Object.assign(DialogWrapper, {
  Body: DialogSection,
  Footer: DialogSection,
});
