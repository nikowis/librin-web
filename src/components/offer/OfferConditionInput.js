import React from 'react';
import PropTypes from "prop-types";
import {convertConditionValueToInt, convertConditionValueToString} from "../../common/app-constants";
import {useTranslation} from "react-i18next";
import Rating from '@material-ui/lab/Rating';
import {translate} from "../../common/i18n-helper";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {FormControl, FormHelperText} from "@material-ui/core";

function OfferConditionInput(props) {

  const {onChange, error, value, touched, onBlur} = props;
  const {t} = useTranslation();
  const [hover, setHover] = React.useState(-1);

  return (
      <FormControl
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
          required
          className={"condition-input"}
      >
        <div className={'input-label'}>{translate('offer.condition.label') + '*'}</div>
        <div className={"condition-box"}>
          <Rating
              id="condition"
              name="condition"
              className={"condition-stars"}
              defaultValue={null}
              value={convertConditionValueToInt(value)}
              onChange={(event, value) => onChange(convertConditionValueToString(value))}
              onBlur={onBlur}
              emptyIcon={<StarBorderIcon fontSize="inherit"/>}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
          />
          <span
              className={'condition-hint'}>{hover > 0 ? t('offer.condition.' + convertConditionValueToString(hover)) : (value ? t('offer.condition.' + value) : null)}</span>
        </div>
        {error && touched ? (
            <FormHelperText error>{translate(error)}</FormHelperText>
        ) : null}
      </FormControl>
  );

}

OfferConditionInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string
};

export default OfferConditionInput;