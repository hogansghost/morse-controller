import styled from "styled-components";
import { Button } from "../Button/styles";

export const Form = styled.form`
  display: flex;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: 32px;
  padding: 32px 64px;
  height: 200px;

  textarea {
    min-height: 0;
  }

  input,
  textarea,
  ${Button} {
    position: relative;
    background-color: var(--interface-colour);

    &::before {
      content: "";
      position: absolute;
      display: block;
      border-radius: 8px;
      inset-block: -5px;
      inset-inline: -5px;
      border: 2px solid var(--interface-colour);
      box-shadow: 0 0 8px 4px var(--interface-colour);
      opacity: 0;
      pointer-events: none;
    }

    &:focus {
      outline: 0;

      &::before {
        opacity: 1;
      }
    }
  }
`;

export const FormInputs = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
`;

export const FormActions = styled.div`
  flex: 0 0 auto;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: 0px minmax(0, 1fr);

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
