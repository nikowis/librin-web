import React from 'react';
import '../../App.scss';
import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import {Formik} from "formik";
import {changePasswordSchema} from "../../common/validation-schemas";
import {Button, TextField} from "@material-ui/core";
import {translate} from "../../common/i18n-helper";


function ChangePasswordView(props) {

    const {t} = useTranslation();

    let {resetTokenId} = useParams();

    const [infoText, setInfoText] = React.useState(null);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.changePassword(resetTokenId, data.password).payload.then(response => {
            if (!response.error) {
                setInfoText(t('user.changePasswordSuccess'));
            } else if (response.status && response.status === 400) {
                setInfoText(response.errors[0].defaultMessage);
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Card>
            <div>
                {t('user.changePassword')}
            </div>
            {infoText ?
                <div>
                    {infoText}
                </div> :
                <Formik validationSchema={changePasswordSchema}
                        onSubmit={handleSubmit}
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
                                    label={t('password')}
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
                                    label={t('repeatPassword')}
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
                                {t('user.changePasswordSubmit')}
                            </Button>
                        </form>
                    )}
                </Formik>
            }
        </Card>
    );
}

ChangePasswordView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangePasswordView));
