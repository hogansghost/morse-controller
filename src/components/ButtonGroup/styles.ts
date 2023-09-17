import styled from 'styled-components';
import { Button } from '../Button/Button.styles';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;

  ${Button} {
    flex: 0 1 auto;
  }
`;
