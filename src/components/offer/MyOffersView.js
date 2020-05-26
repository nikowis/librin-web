import React, {useEffect} from 'react';
import Api from "./../../common/api-communication"
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import LoaderComponent from "../LoaderComponent";
import PropTypes from "prop-types";
import {FETCH_MY_OFFERS} from "../../redux/actions";
import {withRouter} from 'react-router-dom';
import {MY_OFFERS} from "../../common/paths";
import PaginationComponent from "../PaginationComponent";
import OffersGrid from "./OffersGrid";

function MyOffersView(props) {

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

    const getView = () => {
        return <>
            {pageQuery <= totalPages ?
                <>
                    <OffersGrid offers={offers} offerLinkBase={MY_OFFERS}/>
                    <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
                </>
                : t('noElementsFound')}
        </>;
    };

    return (
        <>
            {offers === null ? <LoaderComponent/> : getView()}
        </>
    );
}

MyOffersView.propTypes = {
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
    userId: state.me.id,
    offers: state.myoffers.content,
    currentPage: state.myoffers.currentPage,
    totalPages: state.myoffers.totalPages,
}))(withRouter(MyOffersView));
