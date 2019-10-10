import styled from 'styled-components';

export const AppWrapper = styled.div`
  align-items: center;
  background: #f44336;
  color: #fff;
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  justify-content: center;
`;
export const Circle = styled.div`
  align-items: center;
  border: 3px solid #b71c1c;
  border-radius: 50%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  height: 90vmin;
  width: 90vmin;
`;
export const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
export const SettingsIconWrapper = styled.div`
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
`;
