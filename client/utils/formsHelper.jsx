import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    error={touched && !!error}
    label={`${label} ${touched && error ? error : ''}`}
    {...input}
    {...custom}
  />
);

/* eslint-disable react/prop-types */
export const renderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={(
      <Checkbox
        checked={!!input.value}
        onChange={input.onChange}
        color="primary"
      />
    )}
    label={label}
  />
);
