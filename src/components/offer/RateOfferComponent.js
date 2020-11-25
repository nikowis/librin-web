import React from 'react';
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {TextField} from "@material-ui/core";
import {translate} from "../../common/i18n-helper";
import Button from "@material-ui/core/Button";
import {Formik} from "formik";
import Rating from "@material-ui/lab/Rating/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {createOfferRatingSchema} from "../../common/validation-schemas";
import Api from "../../common/api-communication";
import {HIDE_NOTIFICATION, OFFER_RATING_CREATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {connect} from "react-redux";

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

  return <>{offer.soldToMe ?
      <Formik
          validationSchema={createOfferRatingSchema}
          onSubmit={handleSubmit}
          initialValues={{
            rating: offer.rating ? offer.rating.value : 0,
            description: ""
          }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
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
                <span className={'rating-hint'}>{hover > 0 ? hover + "/5" : (values.rating ? values.rating + "/5" : null)}</span>
              </div>
              {!savedValue && values.rating && values.rating > 0 ?
                  <>
                    <div>
                      <TextField
                          size="small"
                          error={errors.description && touched.description}
                          label={t("offer.description")}
                          name="description"
                          value={values.description}
                          variant={"outlined"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.description && touched.description ? translate(errors.description) : ""
                          }
                          margin="dense"
                          multiline
                          rows={2}
                          rowsMax={4}
                          fullWidth
                      />
                    </div>
                    <div>
                      <Button
                          size={"small"}
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                      >
                        {t("offer.rating.submit")}
                      </Button>
                    </div>
                  </>
                  : <></>}
            </form>
        )}
      </Formik>
      : null}</>;

}

RateOfferComponent.propTypes = {
  userId: PropTypes.number.isRequired,
  otherUserId: PropTypes.number,
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
    status: PropTypes.string,
    ownerId: PropTypes.number,
    soldToMe: PropTypes.bool,
    buyerId: PropTypes.number,
    owner: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    })
  }).isRequired,
};

export default connect(state => ({}))(RateOfferComponent);