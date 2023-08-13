import styled from "styled-components";
import { getGameTheme } from "./utils/getGameTheme";

const { color, backgroundImage } = getGameTheme();

export const App = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-image: ${backgroundImage};

  --interface-colour: ${color};
`;

export const AppController = styled.div`
  position: sticky;
  inset-block-start: 0;
  inset-inline-start: 0;
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
  gap: 16px;
  padding: 16px;
  font-size: 2em;
  text-align: center;
`;

export const AppInput = styled.div`
  position: sticky;
  inset-block-end: 0;
  inset-inline-start: 0;
  padding-block-start: 60px;
  background: linear-gradient(
    0deg,
    rgba(3, 2, 23, 1) 0%,
    rgba(5, 3, 38, 1) 35%,
    rgba(0, 212, 255, 0) 100%
  );
`;
