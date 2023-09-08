import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, ReactNode, forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

const StyledDialog = styled.dialog<{ $size: any }>`
  ${({ $size }) => css`
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 90vh;
    max-width: 100%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 90vh;
    padding: 32px;
    background-color: rgba(0, 0, 0, 1);
    border: 0;
    border-radius: 16px;
    box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 32px -4px rgba(0, 0, 0, 0.2);

    ${$size === 'small' &&
    css`
      width: 600px;
    `}

    ${$size === 'medium' &&
    css`
      width: 800px;
    `}

  &::backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(5px);
    }
  `}
`;

const StyledDialogContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: min-content;
  row-gap: 32px;
`;

export type DialogCommonProps = {
  isOpen: boolean;
  onDismiss: () => void;
};

type DialogProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  DialogCommonProps & {
    children: ReactNode;
    title?: string;
    size?: 'small' | 'medium';
    disableEscClose?: boolean;
  };

export const DialogWrapper = forwardRef<HTMLButtonElement, DialogProps>(
  (
    { children, isOpen, disableEscClose = true, size = 'small', title, onDismiss, role = 'button', ...props },
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleOnKeydownDismiss = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();

        if (!disableEscClose) {
          onDismiss();
        }
      }
    };

    useEffect(() => {
      if (isOpen) {
        return dialogRef.current?.showModal();
      }

      dialogRef.current?.close();
    }, [isOpen, dialogRef.current]);

    useEffect(() => {
      window.addEventListener('keydown', handleOnKeydownDismiss);

      return () => window.removeEventListener('keydown', handleOnKeydownDismiss);
    }, []);

    return createPortal(
      <StyledDialog ref={dialogRef} $size={size}>
        <StyledDialogContent>
          <div>
            {title && <h1>{title}</h1>}

            <button onClick={onDismiss}>X</button>
          </div>

          {children}
        </StyledDialogContent>
      </StyledDialog>,
      document.body
    );
  }
);

export const DialogBody: React.FC<any> = ({ className, children, fullWidth, ...rest }) => (
  <div className={className} {...rest}>
    {children}
  </div>
);

export const Dialog = Object.assign(DialogWrapper, {
  Body: DialogBody,
  Footer: DialogBody,
});
