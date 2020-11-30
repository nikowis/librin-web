import React from "react";
import {useTranslation} from "react-i18next";
import {Formik} from "formik";
import {createOfferSchema, editOfferSchema,} from "common/validation-schemas";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {translate} from "common/i18n-helper";
import PropTypes from "prop-types";
import OfferPhotosEditComponent from "components/offer/OfferPhotosEditComponent";
import {API_ERROR, CLEAR_API_ERROR} from "redux/actions";
import {API_ERROR_NOTIFICATION_DURATION,} from "common/app-constants";
import {connect} from "react-redux";
import BookConditionInput from "components/input/BookConditionInput";
import BookCategoryInput from "components/input/BookCategoryInput";
import BookAuthorInput from "components/input/BookAuthorInput";

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

  return (
      <Formik
          validationSchema={validationSchema}
          onSubmit={props.handleSubmit}
          initialValues={{
            id: offer ? offer.id : null,
            title: offer ? offer.title : "",
            author: offer ? offer.author : "",
            price: offer ? offer.price : "",
            category: offer ? offer.category : null,
            condition: offer ? offer.condition : null,
            description: offer ? offer.description : "",
            photos: offer && offer.photos ? offer.photos : [],
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
              <TextField
                  size="small"
                  error={errors.title && touched.title}
                  label={t("offer.title")}
                  name="title"
                  value={values.title}
                  variant={"outlined"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.title && touched.title ? translate(errors.title) : ""
                  }
                  margin="dense"
                  required
                  fullWidth
              />

              <BookAuthorInput value={values.author} error={errors.author}
                                 touched={touched.author}
                                 onChange={(v) => setFieldValue('author', (v))}/>

              <BookCategoryInput value={values.category} error={errors.category}
                                 touched={touched.category}
                                 onChange={(v) => setFieldValue('category', (v ? v.name : null))}/>

              <BookConditionInput value={values.condition} error={errors.condition}
                                  touched={touched.condition}
                                  onChange={(v) => setFieldValue("condition", v)} onBlur={handleBlur}/>

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
              <CurrencyTextField
                  size="small"
                  error={errors.price && touched.price}
                  label={t("offer.price")}
                  name="price"
                  minimumValue={"0"}
                  variant={"outlined"}
                  value={values.price}
                  currencySymbol={t("currencySymbol")}
                  outputFormat="string"
                  decimalCharacter="."
                  decimalCharacterAlternative=","
                  decimalPlacesShownOnBlur={2}
                  digitGroupSeparator={""}
                  decimalPlaces={2}
                  onChange={(event, value) => setFieldValue("price", value)}
                  onBlur={handleBlur}
                  helperText={
                    errors.price && touched.price ? translate(errors.price) : ""
                  }
                  margin="dense"
                  required
                  fullWidth
              />
              <Button
                  size={"small"}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
              >
                {newOffer ? t("offer.newSubmit") : t("offer.editSubmit")}
              </Button>
            </form>
        )}
      </Formik>
  );
}

EditOfferComponent.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    condition: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photos: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
    ),
  }),
  handleSubmit: PropTypes.func.isRequired,
};

export default connect((state) => ({}))(EditOfferComponent);
