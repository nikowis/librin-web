import React from 'react';
import PropTypes from "prop-types";
import {translate} from "common/i18n-helper";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Api from "common/api-communication";

function BookAuthorInput(props) {

  const {onChange, error, value, touched} = props;

  const [authorOptions, setAuthorOptions] = React.useState([]);

  React.useEffect(() => {
    if (!authorOptions) {
      setAuthorOptions([]);
    }
  }, [authorOptions]);


  const searchAuthorOptions = (v) => {
    setAuthorOptions([]);
    if (v && v.length > 2) {
      Api.getAuthorAutocomplete(v).payload.then(res => {
        setAuthorOptions(res.map(obj => obj.author));
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
            searchAuthorOptions(v);
            onChange(v);
          }}
          size="small"
          disableClearable
          value={value}
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
  error: PropTypes.string
};

export default BookAuthorInput;