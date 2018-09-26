import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import {
  renderTextField,
  renderCheckbox,
} from '../../utils/formsHelper';
import {
  INPUT_TYPES,
} from '../../constants';
import Popup, {
  PopupTitle,
  PopupControls,
} from '../Popup';
import CloseIcon from '../Icons/close';
import Button from '../Button';
import {
  CloseIconWrapper,
  PopupWrapper,
  FormWrapper,
  InputLabel,
  InputWrapper,
} from './styles';

const getInputByType = (input) => {
  switch (input.type) {
    case INPUT_TYPES.NUMBER:
      return (
        <Field
          id={input.key}
          name={input.key}
          label={input.label}
          component={renderTextField}
          type={input.type}
        />
      );
    case INPUT_TYPES.CHECKBOX:
      return (
        <Field
          id={input.key}
          name={input.key}
          label={input.label}
          component={renderCheckbox}
        />
      );
    default:
      return null;
  }
};

class Settings extends PureComponent {
  static propTypes = {
    // onSaveClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    hideSettings: PropTypes.func,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
    // onSaveClick: () => {},
    handleSubmit: () => {},
    hideSettings: () => {},
  };

  state = {};

  onSaveClick() {
    const {
      handleSubmit,
      hideSettings,
    } = this.props;

    handleSubmit();
    hideSettings();
  }

  render() {
    const {
      hideSettings,
      handleSubmit,
      inputs,
      sessions,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <PopupWrapper>
          <Popup>
            <PopupTitle>
              Settings
            </PopupTitle>
            <CloseIconWrapper>
              <CloseIcon onClick={hideSettings} />
            </CloseIconWrapper>
            <FormWrapper>
              <Typography variant="subheading" gutterBottom>
                Sessions:
              </Typography>
              {sessions.map(session => (
                <div key={session.name}>
                  {`${session.name}: ${session.length}`}
                </div>
              ))}

              {inputs.map(input => (
                <InputLabel
                  key={input.key}
                  htmlFor={input.key}
                >
                  <InputWrapper>
                    {getInputByType(input)}
                  </InputWrapper>
                </InputLabel>
              ))}

            </FormWrapper>
            <PopupControls>
              <Button
                onClick={() => this.onSaveClick()}
                modifier={Button.MODIFIERS.DARK}
              >
                Save
              </Button>
            </PopupControls>
          </Popup>
        </PopupWrapper>
      </form>
    );
  }
}

export default reduxForm({
  form: 'settings',
})(Settings);
