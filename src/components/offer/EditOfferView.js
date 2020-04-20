import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Formik} from 'formik';
import {editOfferSchema} from "../../common/validation-schemas";
import {connect} from "react-redux";
import {HIDE_NOTIFICATION, OFFER_UPDATED, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {translate} from "../../common/i18n-helper";
import PropTypes from "prop-types";
import LoaderView from "../LoaderView";
import {MY_OFFERS} from "../../common/paths";

function EditOfferView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;
    let {id} = useParams();

    useEffect(() => {
        if(props.id === null || props.id.toString() !== id) {
            dispatch(Api.getOffer(id));
        }
    }, [dispatch, id]);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.updateOffer(data).payload.then((response) => {
            if (!response.status) {
                dispatch({type: OFFER_UPDATED});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerUpdated')});
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

    const getView = () => {
        return (
            <Formik validationSchema={editOfferSchema} onSubmit={handleSubmit} enableReinitialize={true}
                    initialValues={{
                        id: props.id,
                        title: props.title,
                        author: props.author,
                        price: props.price
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
                                label={t('id')}
                                name="id"
                                value={values.id}
                                disabled={true}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.title && touched.title}
                                label={t('title')}
                                name="title"
                                value={values.title}
                                variant={'outlined'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={(errors.title && touched.title) ? translate(errors.title) : ''}
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
                                helperText={(errors.author && touched.author) ? translate(errors.author) : ''}
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
                                helperText={(errors.price && touched.price) ? translate(errors.price) : ''}
                                margin="normal"
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('offers.edit.submit')}
                        </Button>
                    </form>
                )}
            </Formik>
        );
    };

    return (
        <React.Fragment>
            {props.title === null || props.id.toString() !== id ? <LoaderView/> : getView()}
        </React.Fragment>
    );
}

EditOfferView.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.string,
};

export default connect(state => ({
    id: state.offers.currentOffer.id,
    title: state.offers.currentOffer.title,
    author: state.offers.currentOffer.author,
    price: state.offers.currentOffer.price
}))(withRouter(EditOfferView));
