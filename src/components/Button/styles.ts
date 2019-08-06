import styled, { css, ThemedCssFunction } from 'styled-components';

interface IContainerProps {
  modifier: string;
  kind: string;
  large: boolean;
  disabled: boolean;
}
export const getStyleByType = (type: string) => {
  // Record<string, ThemedCssFunction<IContainerProps>>
  const map: any = {
    PRIMARY: css<IContainerProps>`
      background: none;
      color: #fff;
      &:hover {
        ${props => (props.disabled ? '' : 'background: #b71c1c;')}
      }
    `,
  };
  return map[type];
};
export const getStyleByModifier = (name: string) => {
  const map: any = {
    LIGHT: css <IContainerProps>`
      background: none;
      color: #fff;
      &:hover {
        ${props => (props.disabled ? '' : 'background: #b71c1c;')}
      }
    `,
    DARK: css<IContainerProps>`
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

export const Container = styled.button<IContainerProps>`
  border: none;
  border-radius: 2px;
  padding: 5px 10px;
  transition: background-color 0.2s ease;
  ${props => (props.disabled ? '' : 'cursor: pointer;')}
  ${props => getStyleByType(props.kind)}
  ${props => getStyleByModifier(props.modifier)}
  ${props => (props.large ? 'font-size: 180%;' : '')}
  ${props => (props.disabled ? 'opacity: 0.5;' : '')}
`;
