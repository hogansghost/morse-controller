import styled, { css } from 'styled-components';

export const StyledDialog = styled.dialog<{ $size: any }>`
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

export const StyledDialogContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-auto-rows: min-content;
  row-gap: 32px;
`;

export const StyledDialogHeader = styled.div`
  display: flex;
`;
