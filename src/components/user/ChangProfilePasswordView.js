import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import ChangePasswordForm from "./ChangePasswordForm";
import Button from "@material-ui/core/Button";
import {PROFILE} from "../../common/paths";


function ChangProfilePasswordView(props) {

    const {t} = useTranslation();

    const [infoText, setInfoText] = React.useState(null);

    const handleSubmit = (data, actions) => {
        actions.setSubmitting(true);
        Api.changeProfilePassword(data).payload.then(response => {
            if (!response.error) {
                setInfoText(t('user.password.changeSuccess'));
            } else if (response.status && response.status === 400) {
                setInfoText(response.errors[0].defaultMessage);
            }
        }).finally(() => actions.setSubmitting(false));
    };

    return (
        <Card>
            <div>
                {t('user.password.change')}
            </div>
            {infoText ?
                <>
                <div>
                    {infoText}
                </div>
                    <Button size={"small"} variant="contained" color="primary" type="submit" onClick={() => props.history.push(PROFILE)}>
                        {t('profile.page')}
                    </Button>
                </> :
                <ChangePasswordForm onSubmit={handleSubmit}/>
            }
        </Card>
    );
}

ChangProfilePasswordView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangProfilePasswordView));
