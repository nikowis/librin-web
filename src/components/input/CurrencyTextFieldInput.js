import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

CurrencyTextFieldInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  currencySymbol: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,

};

function CurrencyTextFieldInput(props) {

  const {onChange, onBlur, error, value, touched, required, name, label, currencySymbol, disabled} = props;

  return (
      <CurrencyTextField
          size="small"
          error={error && touched}
          label={label}
          name={name}
          minimumValue={"0"}
          variant={"outlined"}
          value={value}
          currencySymbol={currencySymbol}
          outputFormat="string"
          decimalCharacter="."
          decimalCharacterAlternative=","
          decimalPlacesShownOnBlur={2}
          digitGroupSeparator={""}
          decimalPlaces={2}
          onChange={onChange}
          onBlur={onBlur}
          helperText={(error && touched) && translate(error)}
          margin="dense"
          required={required}
          disabled={disabled}
          fullWidth
      />
  );
}

export default CurrencyTextFieldInput;