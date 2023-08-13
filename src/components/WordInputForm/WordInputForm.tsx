import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import * as Styled from "./styles";

export const WordInputForm = ({
  message,
  isDisabled,
  canReplayMessage,
  onChange,
  onSubmit,
  onReplay,
}: {
  message: string;
  isDisabled: boolean;
  canReplayMessage: boolean;
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  onReplay: () => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const hasNoMessage = !message.length;
  const isSubmitDisabled = hasNoMessage || isDisabled;
  const isReplayDisabled = hasNoMessage || !canReplayMessage;

  const handleEnterKeySubmit = (evt: any) => {
    if (formRef.current && evt.key == "Enter") {
      evt.preventDefault();

      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.addEventListener("keydown", handleEnterKeySubmit);

      return () =>
        messageInputRef.current?.removeEventListener(
          "keydown",
          handleEnterKeySubmit
        );
    }
  }, []);

  return (
    <Styled.Form ref={formRef} onSubmit={onSubmit}>
      <Styled.FormInputs>
        <textarea
          ref={messageInputRef}
          disabled={isDisabled}
          value={message}
          onChange={onChange}
        />
      </Styled.FormInputs>

      <Styled.FormActions>
        <Button type="submit" disabled={isSubmitDisabled}>
          Play
        </Button>
      </Styled.FormActions>

      <Styled.FormActions>
        <Button type="button" disabled={isReplayDisabled} onClick={onReplay}>
          Replay
        </Button>
      </Styled.FormActions>
    </Styled.Form>
  );
};
