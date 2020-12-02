import React from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {createOfferSchema, editOfferSchema,} from "common/validation-schemas";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import OfferPhotosEditComponent from "components/offer/OfferPhotosEditComponent";
import {API_ERROR, CLEAR_API_ERROR} from "redux/actions";
import {API_ERROR_NOTIFICATION_DURATION,} from "common/app-constants";
import {connect} from "react-redux";
import BookConditionInput from "components/input/BookConditionInput";
import BookCategoryInput from "components/input/BookCategoryInput";
import BookAuthorInput from "components/input/BookAuthorInput";
import TextFieldInput from "components/input/TextFieldInput";
import {offerPropType} from "common/prop-types";
import CurrencyTextFieldInput from "components/input/CurrencyTextFieldInput";
import CheckboxInput from "components/input/CheckboxInput";
import CityInput from "components/input/CityInput";

function EditOfferComponent(props) {
  const {t} = useTranslation();
  const {offer} = props;

  const newOffer = !offer;
  let validationSchema = newOffer ? createOfferSchema : editOfferSchema;

  const handlePhotoError = (e) => {
    props.dispatch({
      type: API_ERROR,
      payload: t(e.message),
    });
    setTimeout(() => {
      props.dispatch({type: CLEAR_API_ERROR});
    }, API_ERROR_NOTIFICATION_DURATION);
  };

  const formik = useFormik({
    initialValues: {
      id: offer ? offer.id : null,
      title: offer ? offer.title : "",
      author: offer ? offer.author : "",
      price: offer ? offer.price : "",
      category: offer ? offer.category : null,
      condition: offer ? offer.condition : null,
      description: offer ? offer.description : "",
      photos: offer && offer.photos ? offer.photos : [],
      exchange: offer && offer.exchange ? offer.exchange : props.exchange,
      shipment: offer && offer.shipment ? offer.shipment : props.shipment,
      selfPickup: offer && offer.selfPickup ? offer.selfPickup : props.selfPickup,
      selfPickupCity: offer && offer.selfPickupCity ? offer.selfPickupCity : props.selfPickupCity
    },
    onSubmit: props.handleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true
  });

  const {touched, values, errors, handleChange, setFieldValue, handleBlur, isSubmitting} = formik;

  return (

      <form onSubmit={formik.handleSubmit}>
        <OfferPhotosEditComponent
            photos={values.photos}
            setFieldValue={setFieldValue}
            handlePhotoError={handlePhotoError}
        />
        {errors.photos && touched.photos ? (
            <div className={"label-error"}>
              {t("validations.photo.required")}
            </div>
        ) : null}

        <TextFieldInput onChange={handleChange} error={errors.title} value={values.title} required
                        touched={touched.title} name={'title'} label={t('offer.title')}/>

        <BookAuthorInput value={values.author} error={errors.author}
                         touched={touched.author}
                         onChange={(v) => setFieldValue('author', (v))}/>

        <BookCategoryInput value={values.category} error={errors.category}
                           touched={touched.category}
                           onChange={(v) => setFieldValue('category', (v ? v.name : null))}/>

        <BookConditionInput value={values.condition} error={errors.condition}
                            touched={touched.condition}
                            onChange={(v) => setFieldValue("condition", v)} onBlur={handleBlur}/>

        <TextFieldInput onChange={handleChange} error={errors.description} value={values.description}
                        touched={touched.description} name={'description'} label={t('offer.description')}
                        multiline rows={2} rowsMax={4}/>

        <CurrencyTextFieldInput onChange={(event, value) => setFieldValue("price", value)} error={errors.price}
                                value={values.price} onBlur={handleBlur}
                                touched={touched.price} name={'price'} label={t('offer.price')}
                                currencySymbol={t("currencySymbol")} required={true}
        />

        <CheckboxInput onChange={handleChange} error={errors.exchange} checked={values.exchange}
                       touched={touched.exchange} name={'exchange'} label={t('user.exchange')}/>

        <CheckboxInput onChange={handleChange} error={errors.shipment} checked={values.shipment}
                       touched={touched.shipment} name={'shipment'} label={t('user.shipment')} hideErrorText/>

        <CheckboxInput onChange={handleChange} error={errors.selfPickup} checked={values.selfPickup}
                       touched={touched.selfPickup} name={'selfPickup'} label={t('user.selfPickup')} hideErrorText/>

        {values.selfPickup ?
            <CityInput value={values.selfPickupCity} error={errors.selfPickupCity}
                       touched={touched.selfPickupCity}
                       onChange={(v) => {
                         setFieldValue('selfPickupCity', v);
                       }}
            />
            : null
        }

        <Button size={"small"} variant="contained" color="primary" type="submit"
                disabled={isSubmitting}
        >
          {newOffer ? t("offer.newSubmit") : t("offer.editSubmit")}
        </Button>
      </form>
  );
}


EditOfferComponent.propTypes = {
  offer: offerPropType,
  handleSubmit: PropTypes.func.isRequired,
  exchange: PropTypes.bool,
  shipment: PropTypes.bool,
  selfPickup: PropTypes.bool,
  selfPickupCity: PropTypes.object,
};

export default connect((state) => ({
  exchange: state.me.exchange,
  shipment: state.me.shipment,
  selfPickup: state.me.selfPickup,
  selfPickupCity: state.me.selfPickupCity,
}))(EditOfferComponent);
