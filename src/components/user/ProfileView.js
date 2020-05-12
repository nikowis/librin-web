import React, {useEffect} from 'react';
import '../../App.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import Api from "../../common/api-communication";
import {profileSchema} from "../../common/validation-schemas";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER} from "../../redux/actions";
import PropTypes from "prop-types";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import DeleteAccountComponent from "./DeleteAccountComponent";
import {translate} from "../../common/i18n-helper";
import {PROFILE_CHANGE_PASSWORD} from "../../common/paths";

function ProfileView(props) {

    const {t} = useTranslation();
    const {dispatch, email} = props;

    useEffect(() => {
        if (email === null) {
            dispatch(Api.getUser());
        }
    }, [dispatch, email]);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.updateUser(data).payload.then((response) => {
            if (!response.error) {
                props.dispatch({type: UPDATE_USER, payload: response})
                props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.profileUpdated')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Card>
            <Formik validationSchema={profileSchema} onSubmit={handleSubmit} enableReinitialize={true}
                    initialValues={{
                        id: props.id,
                        email: props.email,
                        firstName: props.firstName,
                        lastName: props.lastName,
                        username: props.username,
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
                                error={errors.email && touched.email}
                                label={t('user.email.label')}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                helperText={(errors.email && touched.email) && translate(errors.email)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.username && touched.username}
                                label={t('user.username')}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                helperText={(errors.username && touched.username) && translate(errors.username)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.firstName && touched.firstName}
                                label={t('user.firstName')}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                helperText={(errors.firstName && touched.firstName) && translate(errors.firstName)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.lastName && touched.lastName}
                                label={t('user.lastName')}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                helperText={(errors.lastName && touched.lastName) && translate(errors.lastName)}
                                margin="normal"
                            />
                        </div>

                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('submit')}
                        </Button>
                    </form>
                )}
            </Formik>
            <Button variant="contained" color="primary" type="submit" onClick={() => props.history.push(PROFILE_CHANGE_PASSWORD)}>
                {t('user.password.change')}
            </Button>
            <DeleteAccountComponent/>
        </Card>
    );

}

ProfileView.propTypes = {
    id: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
};

export default connect(state => ({
    id: state.user.id,
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    username: state.user.username,
}))(withRouter(ProfileView));
