import styled from "styled-components";
import WallpaperForza from "./assets/wallpapers/forza.jpg";
import WallpaperHalo from "./assets/wallpapers/halo.jpg.webp";

export const App = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: min-content minmax(0, 1fr) min-content;
  min-height: 100vh;
  background-size: cover;
  background-image: url(${Math.random() < 0.5
    ? WallpaperHalo
    : WallpaperForza});
`;

export const AppController = styled.div`
  position: sticky;
  inset-block-start: 0;
  inset-inline-start: 0;
  background-color: rgba(0, 0, 0, 0.2);
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
`;
