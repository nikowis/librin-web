import React from 'react';
import {Formik} from "formik";
import {messageSchema} from "../../common/validation-schemas";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import SendIcon from '@material-ui/icons/Send';

function SendMessageFormComponent(props) {

    const {t} = useTranslation();
    const {onSendMessage} = props;

    return (
        <>
            <Formik validationSchema={messageSchema}
                    onSubmit={onSendMessage}
                    initialValues={{
                        content: ''
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
                    <form onSubmit={handleSubmit} className={'send-message-form'}>
                        <TextField
                            size="small"
                            error={errors.content && touched.content}
                            label={t('messages.message')}
                            name="content"
                            variant="outlined"
                            value={values.content}
                            onChange={handleChange}
                            helperText={(errors.content && touched.content) && t(errors.content)}
                            margin="none"
                        />
                        <Button size={"small"} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            <SendIcon fontSize={'small'}/>
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    );
}

SendMessageFormComponent.propTypes = {
    onSendMessage: PropTypes.func
};

export default SendMessageFormComponent;
