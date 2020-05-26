import React, {useEffect} from 'react';

import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import {CLEAR_CURRENT_USER} from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";
import UserCardComponent from "./UserCardComponent";
import PropTypes from "prop-types";

function UserView(props) {

    const [loading, setLoading] = React.useState(false);
    const {t} = useTranslation();
    const {dispatch, username, apiError} = props;
    let {id} = useParams();
    id = parseInt(id);
    const propId = props.id;
    const wrongUserIsLoaded = !propId || propId !== id;
    const validUrlIdParam = !isNaN(id);

    useEffect(() => {
        if (!loading && validUrlIdParam && !apiError && wrongUserIsLoaded) {
            dispatch({type: CLEAR_CURRENT_USER});
            setLoading(true);
            dispatch(Api.getUser(id)).then(() => setLoading(false));
        }
    }, [dispatch, id, wrongUserIsLoaded, loading, apiError, validUrlIdParam]);

    return (
        <>
            {validUrlIdParam && !apiError && wrongUserIsLoaded ? <Card><LoaderComponent/></Card> : (
                !validUrlIdParam || apiError ? <Card>{t('userNotFound')}</Card> :
                    <UserCardComponent username={username}/>
            )}
        </>
    );

}

UserView.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    status: PropTypes.string,
    apiError: PropTypes.string,
};

export default connect(state => ({
    id: state.users.currentUser.id,
    username: state.users.currentUser.username,
    status: state.users.currentUser.status,
    apiError: state.users.currentUser.apiError
}))(withRouter(UserView));
