import React from 'react';
import {Formik} from "formik";
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
            <Formik onSubmit={onSendMessage}
                    initialValues={{
                        content: ''
                    }}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit} className={'send-message-form'}>
                        <TextField
                            size="small"
                            label={t('messages.message')}
                            name="content"
                            variant="outlined"
                            value={values.content}
                            onChange={handleChange}
                            margin="none"
                        />
                        <Button size={"small"} variant="contained" color="primary" type="submit">
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
