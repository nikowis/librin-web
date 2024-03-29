import React from 'react';
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Api from "common/api-communication";
import {HIDE_NOTIFICATION, LOGOUT_ACTION, SHOW_NOTIFICATION} from "redux/actions";
import {NOTIFICATION_DURATION} from "common/app-constants";
import {LOGIN} from "common/paths";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {useFormik} from "formik";
import {deleteAccountSchema} from "common/validation-schemas";
import TextFieldInput from "components/input/TextFieldInput";

function DeleteAccountDialog(props) {

  const [open, setOpen] = React.useState(false);

  const {t} = useTranslation();
  const {dispatch, history} = props;

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.deleteProfile(data).payload.then((response) => {
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

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    onSubmit: handleSubmit,
    validationSchema: deleteAccountSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  return (
      <>
        <Button size={"small"} variant="outlined" color="secondary" onClick={handleClickOpen} startIcon={<DeleteIcon/>}>
          {t('user.deleteAccount')}
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="form-dialog-title">{t('user.deleteAccountHeader')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('user.deleteAccountWarning')}
              </DialogContentText>
              <TextFieldInput onChange={handleChange} error={errors.password} value={values.password}
                              touched={touched.password} name={'password'} type={'password'}
                              label={t('user.password.label')}/>
            </DialogContent>
            <DialogActions>
              <Button size={"small"} onClick={handleClose} color="primary">
                {t('cancel')}
              </Button>
              <Button size={"small"} onClick={handleSubmit} disabled={isSubmitting} startIcon={<DeleteIcon/>}
                      color="secondary">
                {t('user.deleteAccount')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
  );

}

DeleteAccountDialog.propTypes = {};

export default connect()(withRouter(DeleteAccountDialog));

