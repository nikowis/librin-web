import React from 'react';
import PropTypes from "prop-types";
import {OfferCategory} from "common/app-constants";
import {useTranslation} from "react-i18next";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

function BookCategoryInput(props) {

  const {onChange, error, value, touched} = props;
  const {t} = useTranslation();

  return (
      <Autocomplete
          id="category"
          name="category"
          options={OfferCategory}
          fullWidth
          onChange={(e,v) => onChange(v)}
          size="small"
          noOptionsText={''}
          value={value ? OfferCategory.filter(oc => oc.name === value)[0] : null}
          getOptionLabel={(option) => option ? t('offer.category.' + option.name) : ''}
          renderInput={(params) =>
              <TextField {...params}
                         label={translate('offer.category.label')}
                         variant="outlined"
                         required
                         margin="dense"
                         helperText={
                           error && touched ? translate(error) : ""
                         }
                         error={error && touched}
              />}
      />
  );

}

BookCategoryInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};

export default BookCategoryInput;