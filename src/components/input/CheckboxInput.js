import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {FormHelperText} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";

CheckboxInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  hideErrorText: PropTypes.bool,
};

function CheckboxInput(props) {

  const {onChange, error, checked, touched, required, name, label, disabled, hideErrorText} = props;

  return (
      <>
        <FormControlLabel
            control={
              <Checkbox
                  size={'small'}
                  checked={checked}
                  onChange={onChange}
                  id={name}
                  name={name}
                  disabled={disabled}
                  margin="dense"
                  required={required}
              />
            }
            label={label}
        />
        {!hideErrorText && error && touched ?
            <FormHelperText error>{translate(error)}</FormHelperText>
            : null
        }
      </>
  );
}

export default CheckboxInput;