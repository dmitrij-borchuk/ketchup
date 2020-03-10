import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Button(props: any) {
  const {
    children,
    onClick,
    type,
    modifier,
    large,
    disabled,
    ...other
  } = props;

  return (
    <Container
      onClick={onClick}
      kind={type}
      modifier={modifier}
      large={large}
      disabled={disabled}
      {...other}
    >
      {children}
    </Container>
  );
}

Button.TYPES = {
  PRIMARY: 'PRIMARY',
};

Button.MODIFIERS = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    Button.TYPES.PRIMARY,
  ]),
  modifier: PropTypes.oneOf([
    Button.MODIFIERS.LIGHT,
    Button.MODIFIERS.DARK,
  ]),
  large: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  type: Button.TYPES.PRIMARY,
  modifier: Button.MODIFIERS.LIGHT,
  large: false,
  disabled: false,
};
