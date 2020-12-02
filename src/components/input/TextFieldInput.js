import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";

TextFieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
};

function TextFieldInput(props) {

  const {onChange, error, value, touched, required, name, label, disabled, type, onClick} = props;

  return (
      <TextField
          size="small"
          error={error && touched}
          label={label}
          name={name}
          value={value}
          type={type? type : 'text'}
          onChange={onChange}
          helperText={(error && touched) && translate(error)}
          margin="dense"
          variant={'outlined'}
          fullWidth
          onClick={onClick}
          required={required}
          disabled={disabled}
      />
  );
}

export default TextFieldInput;