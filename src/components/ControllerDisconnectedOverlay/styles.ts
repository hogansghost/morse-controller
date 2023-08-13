import styled from "styled-components";

export const ControllerDisconnectedOverlay = styled.div`
  position: fixed;
  inset-inline-start: 0;
  inset-inline-end: 0;
  inset-block-start: 0;
  inset-block-end: 0;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 16px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 10;
`;

export const ControllerDisconnectedOverlayContent = styled.div`
  font-size: 12px;
  color: white;
  background-color: rgba(15, 15, 15, 0.9);
  font-size: 5em;
  text-align: center;
  padding: 100px 32px;
  box-shadow: 0 0 100px -20px black, 0 0 60px -10px black;
`;
