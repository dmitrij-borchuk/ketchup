import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const getStyleByType = (type) => {
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
const Container = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.2s ease;
  ${props => getStyleByType(props.type)}
`;

export default function Button(props) {
  const {
    children,
    onClick,
    type,
  } = props;

  return (
    <Container
      onClick={onClick}
      type={type}
    >
      {children}
    </Container>
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
