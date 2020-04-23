import React, {useEffect} from 'react';
import '../../App.scss';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import LoaderView from "../../components/LoaderView";
import PropTypes from "prop-types";
import {EDIT_OFFER, FETCH_MY_OFFERS, HIDE_NOTIFICATION, SHOW_NOTIFICATION} from "../../redux/actions";
import {store} from "../../index";
import {NOTIFICATION_DURATION} from "../../common/app-constants";
import {withRouter} from 'react-router-dom';
import {MY_OFFERS, OFFERS, VIEW_OFFER} from "../../common/paths";
import OffersTable from "./OffersTable";
import Card from "@material-ui/core/Card";

function MyOffersTableView(props) {

    const {t} = useTranslation();
    const {dispatch, offers, location, history, currentPage, totalPages, userId} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            replace({
                pathname: pathname,
                search: "?" + new URLSearchParams({page: 1}).toString()
            })
        }
    }, [replace, pathname, pageQuery]);

    useEffect(() => {
        if (!pageQuery || Number.isNaN(pageQuery)) {
            return;
        }
        if (offers === null || (pageQuery !== currentPage)) {
            dispatch(Api.getMyOffers(pageQuery - 1, userId, FETCH_MY_OFFERS));
        }
    }, [dispatch, offers, currentPage, pageQuery, userId]);

    const handleDelete = (offer) => {
        dispatch(Api.removeOffer(offer.id)).then(res => {
            if (res.action.payload && !res.action.payload.status) {
                dispatch({type: SHOW_NOTIFICATION, payload: t('notification.offerDeleted')});
                setTimeout(() => {
                    store.dispatch({type: HIDE_NOTIFICATION})
                }, NOTIFICATION_DURATION);
            }
        });
    };

    const handleEdit = (offer) => {
        dispatch({type: EDIT_OFFER, payload: offer});
        props.history.push(MY_OFFERS + '/' + offer.id);
    };

    const handleView = (offer) => {
        dispatch({type: VIEW_OFFER, payload: offer});
        props.history.push(OFFERS + '/' + offer.id);
    };

    const getView = () => {
        return <>
            {pageQuery <= totalPages ? <OffersTable offers={offers} currentPathname={pathname} currentPage={currentPage} totalPages={totalPages} handleDelete={handleDelete} handleEdit={handleEdit} handleView={handleView}/> : t('noElementsFound')}
        </>;
    };

    return (
        <Card>
            {offers === null ? <LoaderView/> : getView()}
        </Card>
    );
}

MyOffersTableView.propTypes = {
    userId: PropTypes.number.isRequired,
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired
        }),
    ),
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    userId: state.user.id,
    offers: state.myoffers.content,
    currentPage: state.myoffers.currentPage,
    totalPages: state.myoffers.totalPages,
}))(withRouter(MyOffersTableView));
