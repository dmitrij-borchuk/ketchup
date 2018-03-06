import React from 'react';
import PropTypes from 'prop-types';

export default function HelloMessage(props) {
  const {
    name,
  } = props;

  return (
    <div>
      Hello {name}
    </div>
  );
}

HelloMessage.propTypes = {
  name: PropTypes.string,
};

HelloMessage.defaultProps = {
  name: '',
};
