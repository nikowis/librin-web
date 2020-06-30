import React, { useEffect } from "react";
import Api from "./../../common/api-communication";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FETCH_MY_OFFERS, REPLACE_MYOFFERS_FILTER } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { MY_OFFERS } from "../../common/paths";
import OffersGrid from "./OffersGrid";
import PaginationComponent from "../PaginationComponent";
import { useTranslation } from "react-i18next";
import { objectEquals } from "../../common/object-helper";

function MyOffersView(props) {
  const { t } = useTranslation();
  const {
    offers,
    location,
    history,
    currentPage,
    totalPages,
    currentFilter,
    newFilter,
    dispatch,
    userId,
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
        type: REPLACE_MYOFFERS_FILTER,
        payload: { page: pageQuery - 1 },
      });
    } else if (!objectEquals(currentFilter, newFilter)) {
      dispatch(Api.getMyOffers(newFilter.page, userId, FETCH_MY_OFFERS));
    }
  }, [
    replace,
    dispatch,
    userId,
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
              myOffers={true}
              offers={offers}
              offerLinkBase={MY_OFFERS}
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

MyOffersView.propTypes = {
  userId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default connect((state) => ({
  userId: state.me.id,
  offers: state.myoffers.content,
  currentPage: state.myoffers.currentPage,
  totalPages: state.myoffers.totalPages,
  currentFilter: state.myoffers.currentFilter,
  newFilter: state.myoffers.newFilter,
}))(withRouter(MyOffersView));
