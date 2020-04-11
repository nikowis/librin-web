import React, {useEffect} from 'react';
import '../../App.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Api from "../../common/api-communication";
import {profileSchema} from "../../common/validation-schemas";
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION, UPDATE_USER} from "../../redux/actions";
import PropTypes from "prop-types";
import {NOTIFICATION_DURATION} from "../../common/app-constants";

function ProfileView(props) {

    const {t} = useTranslation();
    const {dispatch, login} = props;

    useEffect(() => {
        if (login === null) {
            dispatch(Api.getUser());
        }
    }, [dispatch, login]);

    const handleSubmit = (data, actions) => {
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
        });
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
            {({touched, errors, handleSubmit, handleChange, values}) => (

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group controlId="id">
                        <Form.Label>
                            {t('id')}
                        </Form.Label>
                        <Form.Control name="id" value={values.id} disabled={true}/>
                    </Form.Group>
                    <Form.Group controlId="login">
                        <Form.Label>
                            {t('email')}
                        </Form.Label>
                        <Form.Control name="login" value={values.login} disabled={true}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>
                            {t('password')}
                        </Form.Label>
                        <Form.Control name="password" value={values.password} onChange={handleChange}
                                      type="password"
                                      isInvalid={touched.password && !!errors.password}
                                      placeholder={t('password')}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.password)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="repeatPassword">
                        <Form.Label>
                            {t('repeatPassword')}
                        </Form.Label>
                        <Form.Control name="repeatPassword" value={values.repeatPassword} onChange={handleChange}
                                      type="password"
                                      isInvalid={touched.repeatPassword && !!errors.repeatPassword}
                                      placeholder={t('repeatPassword')}/>
                        <Form.Control.Feedback type="invalid">
                            {t(errors.repeatPassword)}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('submit')}
                    </Button>
                </Form>
            )}
        </Formik>
    );

}

ProfileView.propTypes = {
    id: PropTypes.number,
    login: PropTypes.string,
};

export default connect(state => ({
    id: state.user.id,
    login: state.user.login,
}))(withRouter(ProfileView));
