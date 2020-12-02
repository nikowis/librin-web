import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from "@material-ui/core/FormHelperText";

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

function PasswordInput(props) {

  const {onChange, error, value, touched, required, label, disabled} = props;

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
      <div>
      <FormControl margin="dense" size="small"
                   variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
            size="small"
            id="outlined-adornment-password"
            error={error && touched}
            name="password"
            type={passwordVisible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            labelWidth={70}
            required={required}
            disabled={disabled}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
        />
        <FormHelperText id="outlined-weight-helper-text" error={error && touched}>
          {(error && touched) && translate(error)}
        </FormHelperText>
      </FormControl>
      </div>
  );
}

export default PasswordInput;