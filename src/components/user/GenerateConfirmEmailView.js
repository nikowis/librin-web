import {Button, Paper, TextField} from '@material-ui/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from '../../common/app-constants';
import MaxWidthContainer from '../MaxWidthContainer';
import TitleComponent from "../TitleComponent";
import {Formik} from "formik";
import {generateResetPasswordSchema} from "../../common/validation-schemas";
import {translate} from "../../common/i18n-helper";


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
                    <Formik validationSchema={generateResetPasswordSchema}
                            onSubmit={handleSubmit}
                            initialValues={{
                                email: '',
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
                                        variant="outlined"
                                        value={values.email}
                                        onChange={handleChange}
                                        helperText={(errors.email && touched.email) && translate(errors.email)}
                                        margin="dense"
                                    />
                                </div>
                                <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                    {t('user.password.generatePasswordTokenSubmit')}
                                </Button>
                            </form>
                        )}
                    </Formik>
                }
            </Paper>
        </MaxWidthContainer>
    );
}

GenerateConfirmEmailView.propTypes = {};

export default connect(state => ({}))(withRouter(GenerateConfirmEmailView));