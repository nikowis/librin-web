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
import OffersGrid from "../offer/OffersGrid";
import {OFFERS} from "../../common/paths";
import PaginationComponent from "../PaginationComponent";

function UserView(props) {

    const [loading, setLoading] = React.useState(false);
    const {t} = useTranslation();
    const {dispatch, username, apiError, offers, location, history, prevSearch, currentPage, totalPages} = props;
    const {search, pathname} = location;
    const {replace} = history;

    let {id} = useParams();
    id = parseInt(id);
    const propId = props.id;
    const wrongUserIsLoaded = !propId || propId !== id;
    const validUrlIdParam = !isNaN(id);


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
        let searchParams = new URLSearchParams(search);
        searchParams.set('owner', id);
        if (offers === null || (search !== prevSearch)) {
            dispatch(Api.getOffers(searchParams));
        }
    }, [dispatch, offers, pageQuery, id, prevSearch, search]);


    useEffect(() => {
        if (!loading && validUrlIdParam && !apiError && wrongUserIsLoaded) {
            dispatch({type: CLEAR_CURRENT_USER});
            setLoading(true);
            dispatch(Api.getUser(id)).then(() => setLoading(false));
        }
    }, [dispatch, id, wrongUserIsLoaded, loading, apiError, validUrlIdParam]);

    const getOffersView = () => {
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
            {validUrlIdParam && !apiError && wrongUserIsLoaded ? <Card><LoaderComponent/></Card> : (
                !validUrlIdParam || apiError ? <Card>{t('userNotFound')}</Card> :
                    <UserCardComponent username={username}/>
            )}
            {offers === null ? <LoaderComponent/> : getOffersView()}

        </>
    );

}

UserView.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    status: PropTypes.string,
    apiError: PropTypes.string,
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
    prevSearch: PropTypes.string,
    totalPages: PropTypes.number,
};

export default connect(state => ({
    id: state.users.currentUser.id,
    username: state.users.currentUser.username,
    status: state.users.currentUser.status,
    apiError: state.users.currentUser.apiError,
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
    prevSearch: state.offers.search
}))(withRouter(UserView));
