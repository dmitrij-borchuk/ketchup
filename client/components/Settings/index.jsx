import React, {
  PureComponent,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm,
  FieldArray,
  Field,
} from 'redux-form';
import shortid from 'shortid';
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
import validate from './validation';
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

// eslint-disable-next-line react/prop-types
const renderSession = ({ fields }) => (
  <Fragment>
    {fields.map((member, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={index}>
        <Field
          name={`${member}.name`}
          label="Name*"
          component={renderTextField}
          type="text"
        />

        <Field
          name={`${member}.length`}
          label="Length*"
          component={renderTextField}
          type="number"
        />
      </div>
    ))}

    <Button
      onClick={() => fields.push({ id: shortid.generate() })}
      modifier={Button.MODIFIERS.DARK}
    >
      Add session
    </Button>
  </Fragment>
);

class Settings extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    hideSettings: PropTypes.func,
    valid: PropTypes.bool.isRequired,
    inputs: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      type: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
  };

  static defaultProps = {
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
      valid,
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
              <FieldArray
                name="sessions"
                component={renderSession}
              />

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
                disabled={!valid}
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
  validate,
})(Settings);
