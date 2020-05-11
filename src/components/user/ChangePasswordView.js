import React, {useEffect} from 'react';
import '../../App.scss';
import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import Typography from "@material-ui/core/Typography";
import LoaderComponent from "../LoaderComponent";


function ChangePasswordView(props) {

    const {t} = useTranslation();

    const [infoText, setInfoText] = React.useState(null);

    let {resetTokenId} = useParams();

    useEffect(() => {
        Api.confirmEmail(resetTokenId).payload.then(res => {
            if (!res.error) {
                setInfoText(t('confirmEmailSuccess'));
            } else if (res.status && res.status === 400) {
                setInfoText(res.errors[0].defaultMessage);
            }
        });
    }, [t, resetTokenId]);

    return (
        <Card>
            {infoText ?
                <>
                    {infoText}
                </> :
                <>
                    <Typography variant="h6">
                        {t('confirmEmailInProgress')}
                    </Typography>
                    <LoaderComponent/>
                </>
            }
        </Card>
    );
}

ChangePasswordView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangePasswordView));
