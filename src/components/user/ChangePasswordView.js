import React from 'react';
import '../../App.scss';
import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import ChangePasswordForm from "./ChangePasswordForm";


function ChangePasswordView(props) {

    const {t} = useTranslation();

    let {resetTokenId} = useParams();

    const [infoText, setInfoText] = React.useState(null);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.changePassword(resetTokenId, data.password).payload.then(response => {
            if (!response.error) {
                setInfoText(t('user.password.changePasswordSuccess'));
            } else if (response.status && response.status === 400) {
                setInfoText(response.errors[0].defaultMessage);
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Card>
            <div>
                {t('user.password.changePassword')}
            </div>
            {infoText ?
                <div>
                    {infoText}
                </div> :
                <ChangePasswordForm onSubmit={handleSubmit}/>
            }
        </Card>
    );
}

ChangePasswordView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangePasswordView));
