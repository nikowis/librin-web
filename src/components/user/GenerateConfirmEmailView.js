import {Button, Paper} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from '../../common/app-constants';
import MaxWidthContainer from '../MaxWidthContainer';
import TitleComponent from "../TitleComponent";
import {useFormik} from "formik";
import {generateResetPasswordSchema} from "../../common/validation-schemas";
import TextFieldInput from "components/input/TextFieldInput";


function GenerateConfirmEmailView() {

  const {t} = useTranslation();

  const [emailSentTo, setEmailSentTo] = React.useState(null);

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.resendAccountConfirmationEmail(data.email).payload.then(res => {
      if (!res.error) {
        setEmailSentTo(data.email);
      }
    }).finally(() => actions.setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleSubmit,
    validationSchema: generateResetPasswordSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  return (
      <MaxWidthContainer size='xs'>
        <TitleComponent content={t('user.activationEmailMissing')}/>
        <Paper elevation={PAPER_ELEVATION} square style={{padding: '16px 8px'}}>
          <div>
            {t('user.generateActivationEmailHint')}
          </div>
          {emailSentTo ?
              <div>
                {t('user.generateActivationEmailSuccess', {'email': emailSentTo})}
              </div> :
              <form onSubmit={formik.handleSubmit}>
                <TextFieldInput onChange={handleChange} error={errors.email} value={values.email}
                                touched={touched.email} name={'email'} label={t('user.email.label')}/>
                <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {t('user.password.generatePasswordTokenSubmit')}
                </Button>
              </form>
          }
        </Paper>
      </MaxWidthContainer>
  );
}

GenerateConfirmEmailView.propTypes = {};

export default connect(state => ({}))(withRouter(GenerateConfirmEmailView));
