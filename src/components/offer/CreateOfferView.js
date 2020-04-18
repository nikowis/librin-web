import React from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {createOfferSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import {CREATE_OFFER, HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {MY_OFFERS} from "../../common/paths";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {translate} from "../../common/i18n-helper";

function CreateOfferView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.createOffer(data).payload.then((response) => {
            if (!response.status) {
                dispatch({type: CREATE_OFFER});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerCreated')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(MY_OFFERS);
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Formik validationSchema={createOfferSchema} onSubmit={handleSubmit}
                initialValues={{
                    title: '',
                    author: '',
                    price: '0'
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
                    <div>
                        <TextField
                            error={errors.title && touched.title}
                            label={t('title')}
                            name="title"
                            value={values.title}
                            variant={'outlined'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.title && touched.title) ? translate(errors.title): ''}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            error={errors.author && touched.author}
                            label={t('author')}
                            name="author"
                            value={values.author}
                            variant={'outlined'}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={(errors.author && touched.author) ? translate(errors.author): ''}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <CurrencyTextField
                            error={errors.price && touched.price}
                            label={t('price')}
                            name="price"
                            minimumValue={"0"}
                            variant={'outlined'}
                            value={values.price}
                            currencySymbol="PLN"
                            outputFormat="string"
                            decimalCharacter="."
                            decimalCharacterAlternative=","
                            decimalPlacesShownOnBlur={2}
                            digitGroupSeparator={""}
                            decimalPlaces={2}
                            onChange={(event, value) => setFieldValue('price', value)}
                            onBlur={handleBlur}
                            helperText={(errors.price && touched.price) ? translate(errors.price): ''}
                            margin="normal"
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                        {t('offers.create.submit')}
                    </Button>
                </form>
            )}
        </Formik>
    );
}

CreateOfferView.propTypes = {};

export default connect()(withRouter(CreateOfferView));
