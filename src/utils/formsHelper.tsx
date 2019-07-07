import React, { ComponentType } from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { WrappedFieldProps } from 'redux-form';

export const renderTextField: ComponentType<WrappedFieldProps & { label:string }> = ({
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
export const renderCheckbox: ComponentType<WrappedFieldProps & { label: string }> = ({ input, label }) => (
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
