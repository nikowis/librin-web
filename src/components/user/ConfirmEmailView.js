import React, {useEffect} from 'react';
import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import Typography from "@material-ui/core/Typography";
import LoaderComponent from "../LoaderComponent";


function ConfirmEmailView(props) {

    const {t} = useTranslation();

    const [infoText, setInfoText] = React.useState(null);

    let {confirmTokenId} = useParams();

    useEffect(() => {
        Api.confirmEmail(confirmTokenId).payload.then(res => {
            if (!res.error) {
                setInfoText(t('user.email.confirmEmailSuccess'));
            } else if (res.status && res.status === 400) {
                setInfoText(res.errors[0].defaultMessage);
            }
        });
    }, [t, confirmTokenId]);

    return (
        <Card>
            {infoText ?
                <>
                    {infoText}
                </> :
                <>
                    <Typography variant="h6">
                        {t('user.email.confirmEmailInProgress')}
                    </Typography>
                    <LoaderComponent/>
                </>
            }
        </Card>
    );
}

ConfirmEmailView.propTypes = {};

export default connect(state => ({}))(withRouter(ConfirmEmailView));
