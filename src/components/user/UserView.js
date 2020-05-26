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
    const {dispatch, username, loaded} = props;
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
            {!loaded || wrongUserIsLoaded ? <Card><LoaderComponent/></Card> : (
                propId > 0 ? <UserCardComponent username={username}/> :
                    <Card>
                        {t('userNotFound')}
                    </Card>
            )}
        </>
    );

}

UserView.propTypes = {
    loaded: PropTypes.bool.isRequired,
    id: PropTypes.number,
    username: PropTypes.string,
    status: PropTypes.string,
};

export default connect(state => ({
    loaded: state.users.loaded,
    id: state.users.currentUser.id,
    username: state.users.currentUser.username,
    status: state.users.currentUser.status
}))(withRouter(UserView));
