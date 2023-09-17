import styled, { css } from 'styled-components';

export const IconButton = styled.button<{ $size: 'small' | 'medium' | 'large' }>`
  ${({ $size }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    padding: 6px;
    border: 0;
    background: none;
    appearance: none;
    color: #fff;
    user-select: none;

    ${$size === 'small' &&
    css`
      font-size: 1.5rem;
    `}

    ${$size === 'medium' &&
    css`
      font-size: 2rem;
    `}

  ${$size === 'large' &&
    css`
      font-size: 2.5rem;
    `}

  &::before {
      content: '';
      position: absolute;
      inset-block: -2px;
      inset-inline: -2px;
      background: #fff;
      opacity: 0;
      z-index: 0;
      border-radius: inherit;
      transition: opacity 240ms;
    }

    &:not([disabled]) {
      cursor: pointer;

      &:hover,
      &:focus {
        outline: none;

        &::before {
          opacity: 0.35;
        }
      }
    }

    svg {
      position: relative;
      display: block;
      width: 1em;
      height: 1em;
      z-index: 1;
    }
  `}
`;
