import styled from 'styled-components';
import { Button } from '../Button/Button.styles';

export const WordInputFormWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: min-content;
  gap: 16px;
  color: #fff;
  padding: 32px;

  @media screen and (min-width: 768px) {
    padding-inline: 64px;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
  min-height: 200px;

  @media screen and (max-width: 767px) {
    grid-template-rows: 160px 90px 90px;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: 220px 120px;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 136px 136px;
  }

  textarea {
    min-height: 0;
    appearance: none;

    &[disabled] {
      opacity: 0.8;
    }
  }

  input,
  textarea,
  ${Button} {
    position: relative;
    color: var(--interface-colour);
    background-color: var(--interface-background-colour);

    &::before {
      content: '';
      position: absolute;
      display: block;
      border-radius: 8px;
      inset-block: -5px;
      inset-inline: -5px;
      border: 2px solid var(--interface-background-colour);
      box-shadow: 0 0 8px 4px var(--interface-background-colour);
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
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  @media screen and (min-width: 768px) {
    grid-column: span 2;
  }
`;

export const FormActions = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
`;
