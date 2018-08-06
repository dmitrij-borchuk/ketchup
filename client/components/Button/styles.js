import styled, { css } from 'styled-components';

export const getStyleByType = (type) => {
  const map = {
    PRIMARY: css`
      background: none;
      color: #fff;
      &:hover {
        background: #b71c1c;
      }
    `,
  };
  return map[type];
};
export const getStyleByModifier = (name) => {
  const map = {
    LIGHT: css`
      background: none;
      color: #fff;
      &:hover {
        background: #b71c1c;
      }
    `,
    DARK: css`
      background: #b71c1c;
      color: #fff;
      &:hover {
        color: #b71c1c;
        background: none;
      }
    `,
  };
  return map[name];
};
export const Container = styled.button`
  border: none;
  border-radius: 2px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.2s ease;
  ${props => getStyleByType(props.type)}
  ${props => getStyleByModifier(props.modifier)}
`;
