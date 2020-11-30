import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";
import Api from "common/api-communication";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {useTranslation} from "react-i18next";

function CityInput(props) {

  const {onChange, error, value, touched} = props;

  const [cityOptions, setCityOptions] = React.useState([]);
  const [isLoadingOpts, setIsLoadingOpts] = React.useState(false);

  const {t} = useTranslation();

  React.useEffect(() => {
    if (!cityOptions) {
      setCityOptions([]);
    }
  }, [cityOptions]);


  const searchCityOptions = (v) => {
    setCityOptions([]);
    if (v && v.length > 1) {
      setIsLoadingOpts(true);
      Api.getCityAutocomplete(v).payload.then(res => {
        setCityOptions(res);
        setIsLoadingOpts(false);
      });
    }
  };

  return (
      <Autocomplete
          id="selfPickupCity"
          name="selfPickupCity"
          options={cityOptions}
          fullWidth
          loading={isLoadingOpts}
          onChange={(e, v) => {
            setCityOptions([]);
            onChange(v);
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.displayName}
          onInputChange={(e, v) => {
            searchCityOptions(v);
          }}
          size="small"
          value={value}
          loadingText={t('loading')}
          noOptionsText={t('user.selfPickupCityNoOptions')}
          renderInput={(params) =>
              <TextField {...params}
                         label={translate('user.selfPickupCity')}
                         variant="outlined"
                         required={props.required}
                         margin="dense"
                         helperText={
                           error && touched ? translate(error) : ""
                         }
                         error={error && touched}
              />}
      />
  );
}

CityInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  touched: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool
};

export default CityInput;