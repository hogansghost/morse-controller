import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  ReactNode,
  forwardRef
} from "react";
import * as Styled from "./styles";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { children: ReactNode };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, role = "button", ...props },
    ref?: ForwardedRef<HTMLButtonElement>
    ) => (
      // @ts-ignore styled-components refs
    <Styled.Button role={role} ref={ref} {...props}>
      {children}
    </Styled.Button>
  )
);
