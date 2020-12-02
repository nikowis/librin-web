import React from 'react';
import {useFormik} from "formik";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import SendIcon from '@material-ui/icons/Send';
import ReportingComponent from "components/offer/ReportingComponent";
import TextFieldInput from "components/input/TextFieldInput";
import {loginSchema} from "common/validation-schemas";

function SendMessageFormComponent(props) {

  const {t} = useTranslation();
  const {onSendMessage, disabled, conversationId} = props;

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: onSendMessage,
    validationSchema: loginSchema,
  });

  const {values, handleChange} = formik;

  return (
      <div className={'send-message-container'}>
        <ReportingComponent conversationId={conversationId}/>

        <form onSubmit={formik.handleSubmit} className={'send-message-form'}>
          <TextFieldInput onChange={handleChange} value={values.content} onClick={() => props.onClick()}
                          disabled={disabled} name={'content'} label={t('messages.message')}/>

          <Button size={"small"} disabled={disabled} variant="contained" color="primary" type="submit">
            <SendIcon fontSize={'small'}/>
          </Button>

        </form>

      </div>
  );
}

SendMessageFormComponent.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  conversationId: PropTypes.number
};

export default SendMessageFormComponent;
