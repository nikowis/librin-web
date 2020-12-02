import React from 'react';
import {useTranslation} from 'react-i18next';
import {useFormik} from "formik";
import {changePasswordSchema} from "../../common/validation-schemas";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";
import TextFieldInput from "components/input/TextFieldInput";


function ChangePasswordForm(props) {

  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    onSubmit: props.onSubmit,
    validationSchema: changePasswordSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  return (
      <form onSubmit={formik.handleSubmit}>
        <TextFieldInput onChange={handleChange} error={errors.password} value={values.password}
                        touched={touched.password} name={'password'} type={'password'}
                        label={t('user.password.label')}/>

        <TextFieldInput onChange={handleChange} error={errors.repeatPassword} value={values.repeatPassword}
                        touched={touched.repeatPassword} name={'repeatPassword'} type={'password'}
                        label={t('user.password.repeat')}/>

        <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
          {t('user.password.changeSubmit')}
        </Button>
      </form>
  );
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
