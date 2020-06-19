import React from 'react';
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {createOfferSchema, editOfferSchema} from "../../common/validation-schemas";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {translate} from "../../common/i18n-helper";
import Card from "@material-ui/core/Card";
import PhotosInputComponent from "../PhotosInputComponent";
import PropTypes from "prop-types";

function EditOfferComponent(props) {

    const {t} = useTranslation();
    const {offer} = props;

    const newOffer = !offer;
    let validationSchema = newOffer ? createOfferSchema : editOfferSchema;

    return (
        <Card className={'form-container'}>
            <Formik validationSchema={validationSchema} onSubmit={props.handleSubmit}
                    initialValues={{
                        id: offer ? offer.id : null,
                        title: offer ? offer.title : '',
                        author: offer ? offer.author : '',
                        price: offer ? offer.price : '',
                        photos: offer && offer.attachments ? offer.attachments : []
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
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <PhotosInputComponent setFieldValue={setFieldValue} photo={values.photos ? values.photos[0] : null}/>
                        {errors.photos && touched.photos ?
                            (<div className={"photo-label-error"}>{t('validations.photo.required')}</div>)
                            : null
                        }
                        <TextField
                            size="small"
                            error={errors.title && touched.title}
                            label={t('offer.title')}
                            name="title"
                            value={values.title}
                            variant={'outlined'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.title && touched.title) ? translate(errors.title) : ''}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            size="small"
                            error={errors.author && touched.author}
                            label={t('offer.author')}
                            name="author"
                            value={values.author}
                            variant={'outlined'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.author && touched.author) ? translate(errors.author) : ''}
                            margin="normal"
                            fullWidth
                        />
                        <CurrencyTextField
                            size="small"
                            error={errors.price && touched.price}
                            label={t('offer.price')}
                            name="price"
                            minimumValue={"0"}
                            variant={'outlined'}
                            value={values.price}
                            currencySymbol={t('currencySymbol')}
                            outputFormat="string"
                            decimalCharacter="."
                            decimalCharacterAlternative=","
                            decimalPlacesShownOnBlur={2}
                            digitGroupSeparator={""}
                            decimalPlaces={2}
                            onChange={(event, value) => setFieldValue('price', value)}
                            onBlur={handleBlur}
                            helperText={(errors.price && touched.price) ? translate(errors.price) : ''}
                            margin="normal"
                            fullWidth
                        />
                        <Button size={"small"} variant="contained" color="primary" type="submit"
                                disabled={isSubmitting}>
                            {newOffer ? t('offer.newSubmit') : t('offer.editSubmit')}
                        </Button>
                    </form>
                )}
            </Formik>
        </Card>
    );
}

EditOfferComponent.propTypes = {
    offer: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        author: PropTypes.string,
        price: PropTypes.PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        attachment: PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }),
    }),
    handleSubmit: PropTypes.func.isRequired
};

export default EditOfferComponent;
