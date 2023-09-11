import styled from 'styled-components';
import { Button } from '../Button/styles';

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-end;

  ${Button} {
    flex: 0 1 auto;
  }
`;
