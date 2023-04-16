import { ChangeEvent, FormEvent } from "react";
import { Button } from "../Button/Button";
import * as Styled from "./styles";

export const WordInputForm = ({
  disabled,
  message,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  message: string;
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}) => (
  <Styled.Form onSubmit={onSubmit}>
    <textarea
      disabled={disabled}
      value={message}
      onChange={onChange}
    />

    <Button type="submit" disabled={disabled || !message.length}>
      Play
    </Button>
  </Styled.Form>
);
