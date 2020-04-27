import React, {useEffect} from 'react';
import '../../App.scss';
import {useParams, withRouter} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import Button from "@material-ui/core/Button";
import {messageSchema} from "../../common/validation-schemas";
import {Formik} from "formik";
import Api from "../../common/api-communication";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ConversationComponent(props) {

    const {t} = useTranslation();
    const {dispatch, currentConversation, userId} = props;
    const {messages} = currentConversation;
    const propId = currentConversation.id;

    let {convId} = useParams();

    useEffect(() => {
        if (!propId || propId.toString() !== convId) {
            dispatch(Api.getConversation(convId));
        }
    }, [dispatch, convId, propId]);

    const handleSendMessage = (data, actions) => {
        const {dispatch} = props;
        actions.setSubmitting(true);
        dispatch(Api.sendMessage(currentConversation.id, data.content))
            .finally(() => {
                actions.setSubmitting(false)
                actions.resetForm()
            });
    };

    const messageRows = () => {
        return messages.map((msg) => {
            const myMsg = msg.createdBy.toString() === userId.toString();
            return (
                <ListItem key={msg.id} selected={myMsg}>
                    <ListItemText primary={msg.content} secondary={msg.createdAt}/>
                </ListItem>
            )
        });
    };

    return (
        <Card>
            {t('messages.conversation')} {currentConversation.offer ? currentConversation.offer.id : null}

            {
                currentConversation.id ?
                    <List>
                        {messageRows()}
                    </List>
                    : null
            }

            <Formik validationSchema={messageSchema}
                    onSubmit={handleSendMessage}
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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                error={errors.content && touched.content}
                                label={t('content')}
                                name="content"
                                variant="outlined"
                                value={values.content}
                                onChange={handleChange}
                                helperText={(errors.content && touched.content) && t(errors.content)}
                                margin="normal"
                            />
                        </div>
                        <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                            {t('messages.submit')}
                        </Button>
                    </form>
                )}
            </Formik>
        </Card>
    );
}

ConversationComponent.propTypes = {
    userId: PropTypes.number,
    currentConversation:
        PropTypes.shape({
            id: PropTypes.number,
            messages: PropTypes.array,
            offer: PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                author: PropTypes.string,
                price: PropTypes.string,
                status: PropTypes.string,
                ownerId: PropTypes.number,
            }),
            createdAt: PropTypes.string
        }),
    conversations: PropTypes.array
};

export default connect(state => ({
    userId: state.user.id,
    currentConversation: state.messages.currentConversation,
    conversations: state.messages.content
}))(withRouter(ConversationComponent));
