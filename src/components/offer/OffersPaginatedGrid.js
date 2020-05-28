import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import Api from "../../common/api-communication";
import LoaderComponent from "../LoaderComponent";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {OFFERS} from "../../common/paths";
import PaginationComponent from "../PaginationComponent";
import OffersGrid from "./OffersGrid";

function OffersPaginatedGrid(props) {

    const {t} = useTranslation();
    const {offers, location, history, currentLoadedSearch, currentPage, totalPages, loadOffers} = props;
    const {search, pathname} = location;
    const {replace} = history;

    const pageQuery = Api.getPageParam(search);

    useEffect(() => {
        if (isNaN(parseInt(pageQuery))) {
            const urlSearchParams = new URLSearchParams(search);
            urlSearchParams.set('page', 1);
            replace({
                pathname: pathname,
                search: "?" + urlSearchParams.toString()
            })
        }
    }, [replace, pathname, search, pageQuery]);

    useEffect(() => {
        if (isNaN(parseInt(pageQuery))) {
            return;
        }
        if (offers === null || (search !== currentLoadedSearch)) {
            loadOffers(search);
        }
        // eslint-disable-next-line
    }, [offers, pageQuery, currentLoadedSearch, search]);

    const getView = () => {
        return <>
            {pageQuery <= totalPages ?
                <>
                    <OffersGrid offers={offers} offerLinkBase={OFFERS}/>
                    <PaginationComponent currentPathname={pathname} currentPage={currentPage} totalPages={totalPages}/>
                </>
                : t('noElementsFound')}
        </>
    };

    return (
        <>
            {offers === null ? <LoaderComponent/> : getView()}
        </>
    );

}

OffersPaginatedGrid.propTypes = {
    offers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            price: PropTypes.PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            status: PropTypes.string,
            ownerId: PropTypes.number,
            attachment: PropTypes.shape({
                name: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired
            }),
        }),
    ),
    currentPage: PropTypes.number,
    currentLoadedSearch: PropTypes.string,
    totalPages: PropTypes.number,
    loadOffers: PropTypes.func,
};

export default withRouter(OffersPaginatedGrid);
