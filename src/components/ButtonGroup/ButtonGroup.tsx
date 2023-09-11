import { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef, ReactNode, forwardRef } from 'react';
import * as Styled from './styles';

type ButtonGroupProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
};

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, role = 'button', ...props }, ref?: ForwardedRef<HTMLDivElement>) => (
    // @ts-ignore styled-components refs
    <Styled.ButtonGroup ref={ref} {...props}>
      {children}
    </Styled.ButtonGroup>
  )
);
