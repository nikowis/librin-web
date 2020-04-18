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

function CreateOfferView(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.createOffer(data).payload.then((response) => {
            if (!response.status) {
                dispatch({type: CREATE_OFFER});
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerDeleted')});
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
                    description: ''
                }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            error={errors.title && touched.title}
                            label={t('title')}
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            helperText={(errors.title && touched.title) && t(errors.title)}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            error={errors.author && touched.author}
                            label={t('author')}
                            name="author"
                            value={values.author}
                            onChange={handleChange}
                            helperText={(errors.author && touched.author) && t(errors.author)}
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
