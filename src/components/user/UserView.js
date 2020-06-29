import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import Api from "../../common/api-communication";
import { PAPER_ELEVATION } from "../../common/app-constants";
import { OFFERS } from "../../common/paths";
import {
  CLEAR_CURRENT_USER,
  REPLACE_OFFERS_FILTER,
  CHANGE_OFFERS_FILTER,
} from "../../redux/actions";
import LoaderComponent from "../LoaderComponent";
import UserBannerComponent from "./UserBannerComponent";
import { useTranslation } from "react-i18next";
import OffersGrid from "../offer/OffersGrid";
import PaginationComponent from "../PaginationComponent";
import { objectEquals } from "../../common/object-helper";

function UserView(props) {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const {
    offers,
    location,
    username,
    history,
    currentPage,
    totalPages,
    myOffers,
    currentFilter,
    newFilter,
    dispatch,
  } = props;
  const { search, pathname } = location;

  const pageQuery = Api.getPageParam(search);

  let { id } = useParams();
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
      dispatch({ type: CLEAR_CURRENT_USER });
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
    if (isNaN(parseInt(pageQuery))) {
      const urlSearchParams = new URLSearchParams(search);
      urlSearchParams.set("page", 1);
      history.replace({
        pathname: pathname,
        search: "?" + urlSearchParams.toString(),
      });
    } else if (
      !wrongUserIsLoaded &&
      (newFilter.owner !== propId || newFilter.page !== pageQuery - 1)
    ) {
      dispatch({
        type: REPLACE_OFFERS_FILTER,
        payload: { page: pageQuery - 1, owner: propId },
      });
    } else if (!objectEquals(currentFilter, newFilter)) {
      dispatch(Api.getOffers(newFilter));
    }
  }, [
    history,
    dispatch,
    propId,
    wrongUserIsLoaded,
    pathname,
    search,
    pageQuery,
    currentFilter,
    newFilter,
  ]);

  return (
    <>
      {wrongUserIsLoaded ? (
        <LoaderComponent />
      ) : (
        <>
          <Paper
            elevation={PAPER_ELEVATION}
            square
            className={"user-info-card"}
          >
            <UserBannerComponent username={username} />
          </Paper>
          {objectEquals(currentFilter, newFilter) ? (
            pageQuery <= totalPages ? (
              <>
                <OffersGrid
                  myOffers={myOffers}
                  offers={offers}
                  offerLinkBase={OFFERS}
                />
                <PaginationComponent
                  currentPathname={pathname}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              t("noElementsFound")
            )
          ) : null}
        </>
      )}
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
        PropTypes.number,
      ]),
      status: PropTypes.string,
      ownerId: PropTypes.number,
      attachment: PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    })
  ),
  currentPage: PropTypes.number,
  currentLoadedSearch: PropTypes.string,
  totalPages: PropTypes.number,
};

export default connect((state) => ({
  id: state.users.currentUser.id,
  username: state.users.currentUser.username,
  status: state.users.currentUser.status,
  offers: state.offers.content,
  currentPage: state.offers.currentPage,
  totalPages: state.offers.totalPages,
  currentLoadedSearch: state.offers.search,
  currentFilter: state.offers.currentFilter,
  newFilter: state.offers.newFilter,
}))(withRouter(UserView));
