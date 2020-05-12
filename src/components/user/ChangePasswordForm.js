import React from 'react';
import '../../App.scss';
import {useTranslation} from 'react-i18next';
import {Formik} from "formik";
import {changePasswordSchema} from "../../common/validation-schemas";
import {Button, TextField} from "@material-ui/core";
import {translate} from "../../common/i18n-helper";
import PropTypes from "prop-types";


function ChangePasswordForm(props) {

    const {t} = useTranslation();

    return (
        <Formik validationSchema={changePasswordSchema}
                onSubmit={props.onSubmit}
                initialValues={{
                    password: '',
                    repeatPassword: '',
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
                            error={errors.password && touched.password}
                            label={t('user.password.label')}
                            name="password"
                            type="password"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange}
                            helperText={(errors.password && touched.password) && translate(errors.password)}
                            margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                            error={errors.repeatPassword && touched.repeatPassword}
                            label={t('user.password.repeat')}
                            name="repeatPassword"
                            type="password"
                            variant="outlined"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            helperText={(errors.repeatPassword && touched.repeatPassword) && translate(errors.repeatPassword)}
                            margin="normal"
                        />
                    </div>
                    <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                        {t('user.password.changeSubmit')}
                    </Button>
                </form>
            )}
        </Formik>
    );
}

ChangePasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
