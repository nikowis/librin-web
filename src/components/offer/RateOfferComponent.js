import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {useFormik} from "formik";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {createOfferRatingSchema} from "common/validation-schemas";
import Api from "common/api-communication";
import {HIDE_NOTIFICATION, OFFER_RATING_CREATED, SHOW_NOTIFICATION} from "redux/actions";
import {NOTIFICATION_DURATION} from "common/app-constants";
import {connect} from "react-redux";
import TextFieldInput from "components/input/TextFieldInput";
import {offerPropType} from "common/prop-types";

function RateOfferComponent(props) {

  const {userId, offer, dispatch} = props;
  const {t} = useTranslation();
  const [hover, setHover] = React.useState(-1);
  const [savedValue, setSavedValue] = React.useState(offer.rating ? offer.rating.value : null);

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.createOfferRating(userId, {
      value: data.rating,
      offerId: offer.id,
      description: data.description
    }).payload.then((response) => {
      if (!response.error) {
        dispatch({type: OFFER_RATING_CREATED, payload: response});
        dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerRatingCreated')});
        setTimeout(() => {
          dispatch({type: HIDE_NOTIFICATION})
        }, NOTIFICATION_DURATION);
        setSavedValue(data.rating);
      }
    }).finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      rating: offer.rating ? offer.rating.value : 0,
      description: ""
    },
    onSubmit: handleSubmit,
    validationSchema: createOfferRatingSchema,
  });

  const {touched, values, errors, handleChange, handleBlur, setFieldValue, isSubmitting} = formik;

  return <>{offer.soldToMe ?

      <form onSubmit={handleSubmit}>
        <div className={'centeredContainer'}>
          {savedValue ? null : t('offer.rating.label')}
          <Rating
              id="rating"
              name="rating"
              className={"rating-stars"}
              disabled={savedValue}
              defaultValue={null}
              value={values.rating}
              emptyIcon={<StarBorderIcon fontSize="inherit"/>}
              onBlur={handleBlur}
              onChange={(event, value) => setFieldValue("rating", value)}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
          />
          <span
              className={'rating-hint'}>{hover > 0 ? hover + "/5" : (values.rating ? values.rating + "/5" : null)}</span>
        </div>
        {!savedValue && values.rating && values.rating > 0 ?
            <>
              <TextFieldInput onChange={handleChange} error={errors.description} value={values.description}
                              touched={touched.description} name={'description'} label={t('offer.description')}
                              multiline rows={2} rowsMax={4}/>
              <Button
                  size={"small"}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
              >
                {t("offer.rating.submit")}
              </Button>

            </>
            : <></>}
      </form>
      : null}
  </>;

}

RateOfferComponent.propTypes = {
  userId: PropTypes.number.isRequired,
  otherUserId: PropTypes.number,
  offer: offerPropType.isRequired,
};

export default connect(state => ({}))(RateOfferComponent);