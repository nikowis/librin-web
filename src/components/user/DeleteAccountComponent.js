import React from 'react';
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from "../../common/api-communication";
import {HIDE_NOTIFICATION, LOGOUT_ACTION, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {LOGIN} from "../../common/paths";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {Formik} from "formik";
import {deleteAccountSchema} from "../../common/validation-schemas";
import {translate} from "../../common/i18n-helper";

function DeleteAccountComponent(props) {

    const [open, setOpen] = React.useState(false);

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.deleteUser(data).payload.then((response) => {
            if (!response.error) {
                setOpen(false);
                props.dispatch({type: LOGOUT_ACTION});
                props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.accountDeleted')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(LOGIN);
            } else if (response.status && response.status === 400) {
                response.errors.forEach(err => {
                    actions.setFieldError(err.field, err.defaultMessage);
                });
            }
        }).finally(() => actions.setSubmitting(false));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} startIcon={<DeleteIcon/>}>
                {t('deleteAccount')}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Formik validationSchema={deleteAccountSchema}
                        onSubmit={handleSubmit}
                        initialValues={{
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
                            <DialogTitle id="form-dialog-title">{t('deleteAccountHeader')}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {t('deleteAccountWarning')}
                                </DialogContentText>
                                <div>
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        error={errors.password && touched.password}
                                        label={t('user.password.field')}
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        helperText={(errors.password && touched.password) && translate(errors.password)}
                                        margin="dense"
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} disabled={isSubmitting} startIcon={<DeleteIcon/>} color="secondary">
                                    {t('deleteAccount')}
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );

}

DeleteAccountComponent.propTypes = {};

export default connect()(withRouter(DeleteAccountComponent));

