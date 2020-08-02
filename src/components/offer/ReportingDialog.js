import React from 'react';
import {useTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import Api from "../../common/api-communication";
import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Formik} from "formik";
import {reportSchema} from "../../common/validation-schemas";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import {translate} from "../../common/i18n-helper";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

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

  return (
      <>
        <Dialog open={open} onClose={handleClose} className={'report-dialog'} aria-labelledby="form-dialog-title">
          <Formik validationSchema={reportSchema}
                  onSubmit={handleSubmit}
                  initialValues={{
                    description: ''
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
                  <DialogTitle id="form-dialog-title">{titleCaption}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('user.reportDesc')}
                    </DialogContentText>
                    <div>
                      <TextField
                          size="small"
                          error={errors.description && touched.description}
                          label={t("offer.description")}
                          name="description"
                          value={values.description}
                          variant={"outlined"}
                          onChange={handleChange}
                          helperText={
                            errors.description && touched.description ? translate(errors.description) : ""
                          }
                          margin="normal"
                          multiline
                          rows={5}
                          rowsMax={5}
                          fullWidth
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button size={"small"} onClick={handleClose} color="primary">
                      {t('cancel')}
                    </Button>
                    <Button size={"small"} onClick={handleSubmit} disabled={isSubmitting} startIcon={<DeleteIcon/>} color="secondary">
                      {t('report')}
                    </Button>
                  </DialogActions>
                </form>
            )}
          </Formik>
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

export default connect(() => ({

}))(ReportingComponent);

