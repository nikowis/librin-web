import React, {useEffect} from 'react';

import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from 'react-i18next';
import Card from "@material-ui/core/Card";
import Api from "../../common/api-communication";
import {CLEAR_CURRENT_USER} from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";

function UserView(props) {

    const [loading, setLoading] = React.useState(false);

    const {t} = useTranslation();
    const {dispatch, username, status, loaded} = props;
    let {id} = useParams();
    const propId = props.id;
    const wrongUserIsLoaded = !propId || propId.toString() !== id;

    useEffect(() => {
        if (!loading && wrongUserIsLoaded) {
            dispatch({type: CLEAR_CURRENT_USER});
            setLoading(true);
            dispatch(Api.getUser(id));
        }
    }, [dispatch, id, wrongUserIsLoaded, loading]);

    return (
        <>
            <Card className={''}>
                {!loaded || wrongUserIsLoaded ? <LoaderComponent/> : (
                    propId > 0 ? (propId + ' ' + username + ' ' + status) : t('userNotFound')
                )}
            </Card>
        </>
    );

}

UserView.propTypes = {};

export default connect(state => ({
    loaded: state.users.loaded,
    id: state.users.currentUser.id,
    username: state.users.currentUser.username,
    status: state.users.currentUser.status
}))(withRouter(UserView));
