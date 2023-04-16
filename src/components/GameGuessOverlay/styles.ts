import styled from "styled-components";

export const GameGuessOverlay = styled.div`
  position: fixed;
  inset-inline-start: 0;
  inset-block-start: 0;
  inset-inline-end: 0;
  inset-block-end: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  justify-items: center;
  padding: 32px;
`;

export const GameGuessOverlayDialog = styled.dialog`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: 32px;
  gap: 32px;
  margin: auto;
  border: 0;
  background-color: rgba(0, 0, 0, 1);
  border-radius: 16px;
`;

export const GameGuessOverlayDialogActions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;