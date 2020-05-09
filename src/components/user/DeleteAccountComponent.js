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

function DeleteAccountComponent(props) {

    const {t} = useTranslation();
    const {dispatch, history} = props;

    const handleSubmit = () => {
        Api.deleteUser().payload.then((response) => {
            if (!response.error) {
                props.dispatch({type: LOGOUT_ACTION});
                props.dispatch({type: SHOW_NOTIFICATION, payload: t('notification.accountDeleted')});
                setTimeout(() => {
                    dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
                history.push(LOGIN);
            }
        });
    };

    return (
        <Button  variant="outlined" color="secondary" onClick={handleSubmit} startIcon={<DeleteIcon/>} >
            {t('deleteAccount')}
        </Button>
    );
}

DeleteAccountComponent.propTypes = {

};

export default connect()(withRouter(DeleteAccountComponent));

