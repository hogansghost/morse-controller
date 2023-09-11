import { DetailedHTMLProps, DialogHTMLAttributes, ReactNode } from 'react';

export type DialogCommonProps = {
  isOpen: boolean;
  onDismiss?: () => void;
};

export type DialogProps = DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> &
  DialogCommonProps & {
    children: ReactNode;
    title?: string;
    size?: 'small' | 'medium';
    disableEscClose?: boolean;
  };
