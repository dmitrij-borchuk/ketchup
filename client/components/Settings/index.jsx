import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
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
  LabelText,
  InputWrapper,
} from './styles';

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

              {inputs.map(input => (
                <InputLabel
                  key={input.key}
                  htmlFor={input.key}
                >
                  <LabelText>
                    {input.label}
                  </LabelText>
                  <InputWrapper>
                    <Field
                      id={input.key}
                      name={input.key}
                      component="input"
                      type={input.type}
                    />
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
