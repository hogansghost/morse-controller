import styled from "styled-components";

export const ControllerList = styled.div`
  font-size: 12px;
  color: white;
  opacity: 0.8;
  text-align: start;
  padding: 16px;
`;

export const ControllerIconList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, 35px);
  padding: 0;
  margin: 0;
  min-height: 35px;
`;

export const ControllerIconListItem = styled.li`
  aspect-ratio: 1 / 1;
  list-style: none;
  text-align: center;
  font-weight: 700;
`;
