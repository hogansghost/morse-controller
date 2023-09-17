import styled from 'styled-components';

export const App = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-image: var(--interface-background-image);
`;

export const AppController = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  inset-block-start: 0;
  inset-inline-start: 0;
  padding-inline-end: 16px;
  background-color: rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    180deg,
    rgba(3, 2, 0, 1) 0%,
    rgba(5, 0, 0, 0.8) 35%,
    rgba(5, 0, 0, 0) 95%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const AppRoundControls = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  padding: 16px;
  font-size: 2em;
  text-align: center;

  > p {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
`;

export const AppInput = styled.div`
  position: sticky;
  inset-block-end: 0;
  inset-inline-start: 0;
  padding-block-start: 60px;
  background: linear-gradient(0deg, rgba(3, 2, 23, 1) 0%, rgba(5, 3, 38, 1) 35%, rgba(0, 212, 255, 0) 100%);
`;
