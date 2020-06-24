import { Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Api from "../../common/api-communication";
import { PAPER_ELEVATION } from '../../common/app-constants';
import ChangePasswordForm from "./ChangePasswordForm";


function ChangePasswordWithTokenView(props) {

    const {t} = useTranslation();

    let {resetTokenId} = useParams();

    const [infoText, setInfoText] = React.useState(null);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.changePassword(resetTokenId, data.password).payload.then(response => {
            if (!response.error) {
                setInfoText(t('user.password.changeSuccess'));
            } else if (response.status && response.status === 400) {
                setInfoText(response.errors[0].defaultMessage);
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Paper elevation={PAPER_ELEVATION} square>
            <div>
                {t('user.password.change')}
            </div>
            {infoText ?
                <div>
                    {infoText}
                </div> :
                <ChangePasswordForm onSubmit={handleSubmit}/>
            }
        </Paper>
    );
}

ChangePasswordWithTokenView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangePasswordWithTokenView));
