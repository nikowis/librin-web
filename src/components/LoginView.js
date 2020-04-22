import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import {OFFERS} from "../common/paths";
import {Formik} from 'formik';
import {Button, TextField} from '@material-ui/core';
import {loginSchema} from "../common/validation-schemas";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function LoginView(props) {

    const {t} = useTranslation();

    const handleSubmit = (data, actions) => {
        const {dispatch} = props;
        actions.setSubmitting(true);
        dispatch(Api.postLogin(data.login, data.password))
            .finally(() => actions.setSubmitting(false));
    };

    if (props.authenticated) {
        return <Redirect to={OFFERS} push={true}/>
    }

    return (
        <Formik validationSchema={loginSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    login: '',
                    password: ''
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
                            error={errors.login && touched.login}
                            label={t('email')}
                            name="login"
                            variant="outlined"
                            value={values.login}
                            onChange={handleChange}
                            helperText={(errors.login && touched.login) && t(errors.login)}
                            margin="normal"
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
                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                        {t('login.submit')}
                    </Button>
                </form>
            )}
        </Formik>
    );

}

LoginView.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(LoginView);
