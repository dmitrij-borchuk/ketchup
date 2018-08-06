import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Button(props) {
  const {
    children,
    onClick,
    type,
    modifier,
  } = props;

  return (
    <Container
      onClick={onClick}
      type={type}
      modifier={modifier}
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
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  type: Button.TYPES.PRIMARY,
  modifier: Button.MODIFIERS.LIGHT,
};
