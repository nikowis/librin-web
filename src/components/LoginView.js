import React from 'react';
import '../App.scss';
import {Redirect} from "react-router-dom";
import Api from "../common/api-communication";
import {connect} from "react-redux";
import {GENERATE_PASSWORD_RESET, OFFERS} from "../common/paths";
import {Formik} from 'formik';
import {Button, TextField} from '@material-ui/core';
import {loginSchema} from "../common/validation-schemas";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";

function LoginView(props) {

    const {t} = useTranslation();

    const handleSubmit = (data, actions) => {
        const {dispatch} = props;
        actions.setSubmitting(true);
        dispatch(Api.postGetToken(data.email, data.password))
            .finally(() => actions.setSubmitting(false));
    };

    if (props.authenticated) {
        return <Redirect to={OFFERS} push={true}/>
    }
    const urlPrefix = process.env.REACT_APP_BASENAME !== "/" ? process.env.REACT_APP_BASENAME : '';
    return (
        <Card>
            <Formik validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                    initialValues={{
                        email: '',
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
                                error={errors.email && touched.email}
                                label={t('email')}
                                name="email"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                helperText={(errors.email && touched.email) && t(errors.email)}
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
            <Link href={urlPrefix + GENERATE_PASSWORD_RESET}>
                {t('user.generatePasswordTokenLink')}
            </Link>
        </Card>
    );

}

LoginView.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

export default connect(state => ({
    authenticated: state.user.authenticated,
}))(LoginView);
