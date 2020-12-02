import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Api from "common/api-communication";
import {useTranslation} from "react-i18next";

function BookAuthorInput(props) {

  const {onChange, error, value, touched} = props;
  const [authorOptions, setAuthorOptions] = React.useState([]);
  const [isLoadingOpts, setIsLoadingOpts] = React.useState(false);
  const [typingTimeout, setTypingTimeout] = React.useState(0);
  const {t} = useTranslation();

  React.useEffect(() => {
    if (!authorOptions) {
      setAuthorOptions([]);
    }
  }, [authorOptions]);

  const searchAuthorOptionsWithTypingTimeout = (v) => {
    setIsLoadingOpts(true);
    if(typingTimeout) {
      clearTimeout(typingTimeout)
    }
    setTypingTimeout(setTimeout(() => {
      searchAuthorOptions(v);
    }, 300))
  };

  const searchAuthorOptions = (v) => {
    setAuthorOptions([]);
    if (v && v.length > 2) {
      Api.getAuthorAutocomplete(v).payload.then(res => {
        setAuthorOptions(res.map(obj => obj.author));
        setIsLoadingOpts(false);
      });
    }
  };

  return (
      <Autocomplete
          id="author"
          name="author"
          freeSolo
          options={authorOptions}
          fullWidth
          onChange={(e, v) => {
            setAuthorOptions([]);
            onChange(v);
          }}
          onInputChange={(e, v) => {
            searchAuthorOptionsWithTypingTimeout(v);
            onChange(v);
          }}
          size="small"
          disableClearable
          value={value}
          loading={isLoadingOpts}
          loadingText={t('loading')}
          renderInput={(params) =>
              <TextField {...params}
                         label={translate('offer.author')}
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

BookAuthorInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};

export default BookAuthorInput;