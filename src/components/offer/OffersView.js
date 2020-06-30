import React, { useEffect } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import OffersGrid from "./OffersGrid";
import PaginationComponent from "../PaginationComponent";
import PropTypes from "prop-types";
import Api from "../../common/api-communication";
import {
  REPLACE_OFFERS_FILTER,
  FETCH_MAINVIEW_OFFERS,
} from "../../redux/actions";
import { useTranslation } from "react-i18next";
import { objectEquals } from "../../common/object-helper";
import { OFFERS } from "../../common/paths";
import { MAIN_VIEW } from "../../redux/offersReducer";

function OffersView(props) {
  const { t } = useTranslation();
  const {
    offers,
    location,
    history,
    currentPage,
    totalPages,
    myOffers,
    currentFilter,
    newFilter,
    dispatch,
  } = props;
  const { search, pathname } = location;
  const { replace } = history;

  const pageQuery = Api.getPageParam(search);

  useEffect(() => {
    if (isNaN(parseInt(pageQuery))) {
      const urlSearchParams = new URLSearchParams(search);
      urlSearchParams.set("page", 1);
      replace({
        pathname: pathname,
        search: "?" + urlSearchParams.toString(),
      });
    } else if (newFilter.page !== pageQuery - 1) {
      dispatch({
        type: REPLACE_OFFERS_FILTER,
        view: MAIN_VIEW,
        payload: { page: pageQuery - 1 },
      });
    } else if (!objectEquals(currentFilter, newFilter)) {
      dispatch(Api.getOffers(newFilter, FETCH_MAINVIEW_OFFERS));
    }
  }, [
    replace,
    dispatch,
    pathname,
    search,
    pageQuery,
    currentFilter,
    newFilter,
  ]);

  return (
    <>
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
  );
}

OffersView.propTypes = {
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
  totalPages: PropTypes.number,
  myOffers: PropTypes.bool,
  offerLinkBase: PropTypes.string.isRequired,
  currentFilter: PropTypes.object.isRequired,
  newFilter: PropTypes.object.isRequired,
};

export default connect((state) => ({
  offers: state.offers.mainView.content,
  currentPage: state.offers.mainView.currentPage,
  totalPages: state.offers.mainView.totalPages,
  currentFilter: state.offers.mainView.currentFilter,
  newFilter: state.offers.mainView.newFilter,
}))(withRouter(OffersView));
