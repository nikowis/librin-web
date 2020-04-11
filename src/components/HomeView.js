import React, {useEffect} from 'react';
import '../App.scss';
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import Api from "../common/api-communication";
import LoaderView from "./LoaderView";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

function HomeView(props) {

    const {t} = useTranslation();
    const {dispatch, authenticated, login} = props;

    useEffect(() => {
        if (authenticated && login === null) {
            dispatch(Api.getUser());
        }
    }, [dispatch, authenticated, login]);

    const actionDescription = () => {
        return <div className='quick-action-desc'>
            {!props.authenticated ?
                t('home.unauthenticatedMonit') :
                t('home.authenticatedMonit')
            }
        </div>;
    };

    const getView = () => {
        return (
            <>
                <h5 className='home'>
                    {props.login ? t('home.title', {'name': props.login}) : t('home.title', {'name': t('home.stranger')})}
                </h5>
                <div className='app-description'>
                    {t('home.appDescription')}
                </div>
                {actionDescription()}
            </>
        );
    };


    return (
        <>
            {!props.authenticated || (props.authenticated && props.login) ? getView() :
                <LoaderView/>}
        </>
    );


}

HomeView.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    login: PropTypes.string
};

export default connect(state => ({
    authenticated: state.user.authenticated,
    login: state.user.login
}))(withRouter(HomeView));
