import {Paper} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {useParams, withRouter} from "react-router-dom";
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from '../../common/app-constants';
import LoaderComponent from "../LoaderComponent";
import MaxWidthContainer from '../MaxWidthContainer';
import TitleComponent from "../TitleComponent";


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
        <MaxWidthContainer size={'xs'}>
            <TitleComponent content={t('user.confirmEmailPage')}/>
            <Paper elevation={PAPER_ELEVATION} square>
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
            </Paper>
        </MaxWidthContainer>
    );
}

ConfirmEmailView.propTypes = {};

export default connect(state => ({}))(withRouter(ConfirmEmailView));
