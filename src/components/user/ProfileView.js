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
        Api.updateUser(data.password).payload.then((response) => {
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
                        password: '',
                        repeatPassword: ''
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
                                label={t('id')}
                                name="id"
                                value={values.id}
                                disabled={true}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.email && touched.email}
                                label={t('email')}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                helperText={(errors.email && touched.email) && t(errors.email)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.firstName && touched.firstName}
                                label={t('firstName')}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                helperText={(errors.firstName && touched.firstName) && t(errors.firstName)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.lastName && touched.lastName}
                                label={t('lastName')}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                helperText={(errors.lastName && touched.lastName) && t(errors.lastName)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.username && touched.username}
                                label={t('username')}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                helperText={(errors.username && touched.username) && t(errors.username)}
                                margin="normal"
                                disabled={true}
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.password && touched.password}
                                label={t('password')}
                                name="password"
                                type="password"
                                variant="outlined"
                                value={values.password}
                                onChange={handleChange}
                                helperText={(errors.password && touched.password) && t(errors.password)}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                error={errors.repeatPassword && touched.repeatPassword}
                                label={t('repeatPassword')}
                                name="repeatPassword"
                                type="password"
                                variant="outlined"
                                value={values.repeatPassword}
                                onChange={handleChange}
                                helperText={(errors.repeatPassword && touched.repeatPassword) && t(errors.repeatPassword)}
                                margin="normal"
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('submit')}
                        </Button>
                    </form>
                )}
            </Formik>
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
