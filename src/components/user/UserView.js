import { Paper } from '@material-ui/core';
import PropTypes from "prop-types";
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Api from "../../common/api-communication";
import { PAPER_ELEVATION } from '../../common/app-constants';
import { OFFERS } from "../../common/paths";
import { CLEAR_CURRENT_USER } from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";
import OffersPaginatedGrid from "../offer/OffersPaginatedGrid";
import UserBannerComponent from "./UserBannerComponent";


function UserView(props) {

    const [loading, setLoading] = React.useState(false);
    const {dispatch, history, username, offers, currentLoadedSearch, currentPage, totalPages} = props;

    let {id} = useParams();
    id = parseInt(id);
    const invalidId = isNaN(id);
    if (invalidId) {
        history.push(OFFERS);
    }
    const propId = props.id;
    const wrongUserIsLoaded = !propId || propId !== id;

    const loadOffers = (search) => {
        //TODO store user offers somewhere else or clear on redirect
        let searchParams = new URLSearchParams(search);
        searchParams.set('owner', id);
        dispatch(Api.getOffers(new URLSearchParams(searchParams)));
    };

    useEffect(() => {
        if (!loading && !invalidId && wrongUserIsLoaded) {
            dispatch({type: CLEAR_CURRENT_USER});
            setLoading(true);
            dispatch(Api.getUser(id)).then(res => {
                if (res.action.payload.status === 400) {
                    history.replace(OFFERS);
                }
            }).then(() => setLoading(false));
        }
    }, [dispatch, history, id, wrongUserIsLoaded, loading, invalidId]);

    return (
        <>
            {wrongUserIsLoaded ? <LoaderComponent/> :
                <>
                    <Paper elevation={PAPER_ELEVATION} square className={'user-info-card'}>
                        <UserBannerComponent username={username}/>
                    </Paper>
                    <OffersPaginatedGrid offers={offers} currentPage={currentPage} totalPages={totalPages}
                                         currentLoadedSearch={currentLoadedSearch} loadOffers={loadOffers}
                                         offerLinkBase={OFFERS}/>
                </>
            }
        </>
    );

}

UserView.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    status: PropTypes.string,
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
};

export default connect(state => ({
    id: state.users.currentUser.id,
    username: state.users.currentUser.username,
    status: state.users.currentUser.status,
    offers: state.offers.content,
    currentPage: state.offers.currentPage,
    totalPages: state.offers.totalPages,
    currentLoadedSearch: state.offers.search
}))(withRouter(UserView));
