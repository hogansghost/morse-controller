import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  text-align: center;
  padding: 8px 16px;
  border-radius: 6px;
  color: var(--interface-colour);
  background-color: var(--interface-background-colour);
  appearance: none;
  user-select: none;

  &[disabled] {
    opacity: 0.8;
  }
`;
