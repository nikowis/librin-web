import {Paper} from "@material-ui/core";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams, withRouter} from "react-router-dom";
import Api from "../../common/api-communication";
import {PAPER_ELEVATION} from "../../common/app-constants";
import {OFFERS} from "../../common/paths";
import {CLEAR_CURRENT_USER, FETCH_USERVIEW_OFFERS, REPLACE_OFFERS_FILTER,} from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";
import UserBannerComponent from "./UserBannerComponent";
import {useTranslation} from "react-i18next";
import OffersGrid from "../offer/OffersGrid";
import PaginationComponent from "../PaginationComponent";
import {objectEquals} from "../../common/object-helper";
import {USER_VIEW} from "../../redux/offersReducer";

function UserView(props) {
  const [loading, setLoading] = React.useState(false);
  const {t} = useTranslation();
  const {
    offers,
    location,
    username,
    avgRating,
    ratingCount,
    status,
    history,
    totalPages,
    myOffers,
    currentFilter,
    newFilter,
    dispatch,
  } = props;
  const {search, pathname} = location;

  const pageQuery = Api.getPageParam(search);

  let {id} = useParams();
  id = parseInt(id);
  const invalidId = isNaN(id);
  if (invalidId) {
    history.push(OFFERS);
  }
  const propId = props.id;
  const wrongUserIsLoaded = !propId || propId !== id;

  useEffect(() => {
    //load user entity
    if (!loading && !invalidId && wrongUserIsLoaded) {
      dispatch({type: CLEAR_CURRENT_USER});
      setLoading(true);
      dispatch(Api.getUser(id))
          .then((res) => {
            if (res.action.payload.status === 400) {
              history.replace(OFFERS);
            }
          })
          .then(() => setLoading(false));
    }
  }, [dispatch, history, id, wrongUserIsLoaded, loading, invalidId]);

  useEffect(() => {
    if (newFilter.owner !== id || newFilter.page !== pageQuery) {
      dispatch({
        type: REPLACE_OFFERS_FILTER,
        view: USER_VIEW,
        payload: {page: pageQuery, owner: id},
      });
    } else if (!objectEquals(currentFilter, newFilter)) {
      dispatch(Api.getOffers(newFilter, FETCH_USERVIEW_OFFERS));
    }
  }, [
    history,
    dispatch,
    id,
    pathname,
    search,
    pageQuery,
    currentFilter,
    newFilter,
  ]);

  return (
      <>
        {wrongUserIsLoaded ? (
            <LoaderComponent/>
        ) : (
            <>
              <Paper
                  elevation={PAPER_ELEVATION}
                  square
                  className={"user-info-card"}
              >
                <UserBannerComponent user={{id, username, status, avgRating, ratingCount}}/>
              </Paper>
              {objectEquals(currentFilter, newFilter) ? (
                  offers && offers.length > 0 ? (
                      <>
                        <OffersGrid
                            myOffers={myOffers}
                            offers={offers}
                            offerLinkBase={OFFERS}
                        />
                      </>
                  ) : (
                      t("noElementsFound")
                  )
              ) : null}
              <PaginationComponent totalPages={totalPages}/>
            </>
        )}
      </>
  );
}

UserView.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  status: PropTypes.string,
  avgRating: PropTypes.number,
  ratingCount: PropTypes.number,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        price: PropTypes.PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        status: PropTypes.string,
        ownerId: PropTypes.number,
        photo: PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        }),
      })
  ),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  currentFilter: PropTypes.object.isRequired,
  newFilter: PropTypes.object.isRequired,
};

export default connect((state) => ({
  id: state.users.currentUser.id,
  username: state.users.currentUser.username,
  status: state.users.currentUser.status,
  avgRating: state.users.currentUser.avgRating,
  ratingCount: state.users.currentUser.ratingCount,
  offers: state.offers.userView.content,
  currentPage: state.offers.userView.currentPage,
  totalPages: state.offers.userView.totalPages,
  currentFilter: state.offers.userView.currentFilter,
  newFilter: state.offers.userView.newFilter,
}))(withRouter(UserView));
