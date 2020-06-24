import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Formik } from 'formik';
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Api from "../../common/api-communication";
import { NOTIFICATION_DURATION, PAPER_ELEVATION } from "../../common/app-constants";
import { translate } from "../../common/i18n-helper";
import { PROFILE_CHANGE_PASSWORD } from "../../common/paths";
import { profileSchema } from "../../common/validation-schemas";
import { HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER } from "../../redux/actions";
import DeleteAccountComponent from "./DeleteAccountComponent";



function ProfileView(props) {

    const {t} = useTranslation();
    const {dispatch, email} = props;

    useEffect(() => {
        if (email === null) {
            dispatch(Api.getMe());
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
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
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
                                size="small"
                                error={errors.email && touched.email}
                                label={t('user.email.label')}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                helperText={(errors.email && touched.email) && translate(errors.email)}
                                margin="normal"
                                disabled={true}
                                variant={'outlined'}
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                size="small"
                                error={errors.username && touched.username}
                                label={t('user.username')}
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                helperText={(errors.username && touched.username) && translate(errors.username)}
                                margin="normal"
                                disabled={true}
                                variant={'outlined'}
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                size="small"
                                error={errors.firstName && touched.firstName}
                                label={t('user.firstName')}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                helperText={(errors.firstName && touched.firstName) && translate(errors.firstName)}
                                margin="normal"
                                variant={'outlined'}
                                fullWidth
                            />
                        </div>
                        <div>
                            <TextField
                                size="small"
                                error={errors.lastName && touched.lastName}
                                label={t('user.lastName')}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                helperText={(errors.lastName && touched.lastName) && translate(errors.lastName)}
                                margin="normal"
                                variant={'outlined'}
                                fullWidth
                            />
                        </div>

                        <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('submit')}
                        </Button>
                    </form>
                )}
            </Formik>
            <Button size={"small"} variant="contained" color="primary" type="submit" onClick={() => props.history.push(PROFILE_CHANGE_PASSWORD)}>
                {t('user.password.change')}
            </Button>
            <DeleteAccountComponent/>
        </Paper>
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
    id: state.me.id,
    email: state.me.email,
    firstName: state.me.firstName,
    lastName: state.me.lastName,
    username: state.me.username,
}))(withRouter(ProfileView));
