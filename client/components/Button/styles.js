import styled, { css } from 'styled-components';

export const getStyleByType = (type) => {
  const map = {
    PRIMARY: css`
      background: none;
      color: #fff;
      &:hover {
        ${props => (props.disabled ? '' : 'background: #b71c1c;')}
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
        ${props => (props.disabled ? '' : 'background: #b71c1c;')}
      }
    `,
    DARK: css`
      background: #b71c1c;
      color: #fff;
      &:hover {
        ${props => (props.disabled ? '' : `
          color: #b71c1c;
          background: none;
        `)}
      }
    `,
  };
  return map[name];
};
export const Container = styled.button`
  border: none;
  border-radius: 2px;
  padding: 5px 10px;
  transition: background-color 0.2s ease;
  ${props => (props.disabled ? '' : 'cursor: pointer;')}
  ${props => getStyleByType(props.type)}
  ${props => getStyleByModifier(props.modifier)}
  ${props => (props.large ? 'font-size: 180%;' : '')}
  ${props => (props.disabled ? 'opacity: 0.5;' : '')}
`;
