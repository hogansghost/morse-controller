import styled from 'styled-components';
import { Button } from '../Button/styles';
import { ButtonGroup } from '../ButtonGroup/styles';

export const StyledButtonGroup = styled(ButtonGroup)`
  ${Button} {
    flex: 1 1 auto;
  }
`;
