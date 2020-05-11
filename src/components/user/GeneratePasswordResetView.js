import React from 'react';
import '../../App.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import {Formik} from "formik";
import {generateResetPasswordSchema} from "../../common/validation-schemas";
import {Button, TextField} from "@material-ui/core";


function GeneratePasswordResetView(props) {

    const {t} = useTranslation();

    const [emailSentTo, setEmailSentTo] = React.useState(null);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.generateResetPasswordToken(data.email).payload.then(res => {
            if (!res.error) {
                setEmailSentTo(data.email);
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Card>
            <div>
                {t('user.generatePasswordTokenLink')}
            </div>
            {emailSentTo ?
                <div>
                    {t('user.generatePasswordSuccess', {'email': emailSentTo})}
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
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                                {t('user.generatePasswordTokenSubmit')}
                            </Button>
                        </form>
                    )}
                </Formik>
            }
        </Card>
    );
}

GeneratePasswordResetView.propTypes = {};

export default connect(state => ({}))(withRouter(GeneratePasswordResetView));
