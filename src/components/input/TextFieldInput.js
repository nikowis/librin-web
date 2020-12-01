import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";

TextFieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

function TextFieldInput(props) {

  const {onChange, error, value, touched, required, name, label, disabled} = props;

  return (
      <TextField
          size="small"
          error={error && touched}
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          helperText={(error && touched) && translate(error)}
          margin="dense"
          variant={'outlined'}
          fullWidth
          required={required}
          disabled={disabled}
      />
  );
}

export default TextFieldInput;