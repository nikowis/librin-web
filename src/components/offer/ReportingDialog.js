import React from 'react';
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import Api from "common/api-communication";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "redux/actions";
import {NOTIFICATION_DURATION} from "common/app-constants";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {useFormik} from "formik";
import {reportSchema} from "common/validation-schemas";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import TextFieldInput from "components/input/TextFieldInput";

function ReportingComponent(props) {

  const {t} = useTranslation();
  const {open, handleClose, userId, conversationId, offerId, dispatch} = props;

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    data.userId = userId;
    data.conversationId = conversationId;
    data.offerId = offerId;
    Api.report(data).payload.then((response) => {
      if (!response.error) {
        dispatch({type: SHOW_NOTIFICATION, payload: t('reportSuccess')});
        setTimeout(() => {
          dispatch({type: HIDE_NOTIFICATION})
        }, NOTIFICATION_DURATION);
        handleClose();
      } else if (response.status && response.status === 400) {
        response.errors.forEach(err => {
          actions.setFieldError(err.field, err.defaultMessage);
        });
      }
    }).finally(() => actions.setSubmitting(false));
  };

  const titleCaption = userId ? t('user.report') : (offerId ? t('offer.report') : t('messages.report'));

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    onSubmit: handleSubmit,
    validationSchema: reportSchema,
  });

  const {touched, values, errors, handleChange, isSubmitting} = formik;

  return (
      <>
        <Dialog open={open} onClose={handleClose} className={'report-dialog'} aria-labelledby="form-dialog-title">

          <form onSubmit={formik.handleSubmit}>
            <DialogTitle id="form-dialog-title">{titleCaption}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('user.reportDesc')}
              </DialogContentText>

              <TextFieldInput onChange={handleChange} error={errors.description} value={values.description}
                              touched={touched.description} name={'description'} label={t('offer.description')}
                              multiline rows={5} rowsMax={5}/>
            </DialogContent>
            <DialogActions>
              <Button size={"small"} onClick={handleClose} color="primary">
                {t('cancel')}
              </Button>
              <Button size={"small"} onClick={handleSubmit} disabled={isSubmitting} startIcon={<DeleteIcon/>}
                      color="secondary">
                {t('report')}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>);

}

ReportingComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.number,
  conversationId: PropTypes.number,
  offerId: PropTypes.number,
};

export default connect(() => ({}))(ReportingComponent);

