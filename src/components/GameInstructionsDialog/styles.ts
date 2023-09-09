import styled from 'styled-components';
import { Button } from '../Button/styles';

export const GameInstructionsOverlayDialog = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: 32px;
  gap: 32px;
`;

export const GameInstructionsOverlayDialogActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  ${Button} {
    flex: 1 1 auto;
  }
`;
