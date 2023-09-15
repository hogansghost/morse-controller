import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, ReactNode, forwardRef } from 'react';
import * as Styled from './styles';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
  'aria-label': string;
  size?: 'small' | 'medium' | 'large';
};

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, role = 'button', 'aria-label': ariaLabel, size = 'medium', ...props },
    ref?: ForwardedRef<HTMLButtonElement>
  ) => (
    // @ts-ignore styled-components refs
    <Styled.IconButton role={role} ref={ref} aria-label={ariaLabel} $size={size} {...props}>
      {children}
    </Styled.IconButton>
  )
);
