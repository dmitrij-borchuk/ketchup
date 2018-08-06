import React from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  Container,
  Title,
  Controls,
} from './styles';

export function PopupTitle(props) {
  const {
    children,
  } = props;

  return (
    <Title>
      {children}
    </Title>
  );
}
PopupTitle.propTypes = {
  children: PropTypes.node,
};
PopupTitle.defaultProps = {
  children: null,
};

export function PopupControls(props) {
  const {
    children,
  } = props;

  return (
    <Controls>
      {children}
    </Controls>
  );
}
PopupControls.propTypes = {
  children: PropTypes.node,
};
PopupControls.defaultProps = {
  children: null,
};

export default function Popup(props) {
  const {
    children,
  } = props;

  return (
    <Overlay>
      <Container>
        {children}
      </Container>
    </Overlay>
  );
}
Popup.propTypes = {
  children: PropTypes.node,
};
Popup.defaultProps = {
  children: null,
};
