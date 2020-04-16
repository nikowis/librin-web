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

function ProfileView(props) {

    const {t} = useTranslation();
    const {dispatch, login} = props;

    useEffect(() => {
        if (login === null) {
            dispatch(Api.getUser());
        }
    }, [dispatch, login]);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.updateUser(data.password).payload.then((response) => {
            if (!response.status) {
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
        <Formik validationSchema={profileSchema} onSubmit={handleSubmit} enableReinitialize={true}
                initialValues={{
                    id: props.id,
                    login: props.login,
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
                            error={errors.login && touched.login}
                            label={t('email')}
                            name="login"
                            value={values.login}
                            onChange={handleChange}
                            helperText={(errors.login && touched.login) && t(errors.login)}
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
    );

}


// <Form noValidate onSubmit={handleSubmit}>
//     <Form.Group controlId="id">
//         <Form.Label>
//             {t('id')}
//         </Form.Label>
//         <Form.Control name="id" value={values.id} disabled={true}/>
//     </Form.Group>
//     <Form.Group controlId="login">
//         <Form.Label>
//             {t('email')}
//         </Form.Label>
//         <Form.Control name="login" value={values.login} disabled={true}/>
//     </Form.Group>
//     <Form.Group controlId="password">
//         <Form.Label>
//             {t('password')}
//         </Form.Label>
//         <Form.Control name="password" value={values.password} onChange={handleChange}
//                       type="password"
//                       isInvalid={touched.password && !!errors.password}
//                       placeholder={t('password')}/>
//         <Form.Control.Feedback type="invalid">
//             {t(errors.password)}
//         </Form.Control.Feedback>
//     </Form.Group>
//     <Form.Group controlId="repeatPassword">
//         <Form.Label>
//             {t('repeatPassword')}
//         </Form.Label>
//         <Form.Control name="repeatPassword" value={values.repeatPassword} onChange={handleChange}
//                       type="password"
//                       isInvalid={touched.repeatPassword && !!errors.repeatPassword}
//                       placeholder={t('repeatPassword')}/>
//         <Form.Control.Feedback type="invalid">
//             {t(errors.repeatPassword)}
//         </Form.Control.Feedback>
//     </Form.Group>

ProfileView.propTypes = {
    id: PropTypes.number,
    login: PropTypes.string,
};

export default connect(state => ({
    id: state.user.id,
    login: state.user.login,
}))(withRouter(ProfileView));
