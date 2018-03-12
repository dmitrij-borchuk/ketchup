import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import css from './styles.css';

export default function Button(props) {
  const {
    children,
    onClick,
    type,
  } = props;
  const className = cn(css.button, css[type.toLowerCase()]);

  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
Button.TYPES = {
  PRIMARY: 'PRIMARY',
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
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  type: Button.TYPES.PRIMARY,
};
