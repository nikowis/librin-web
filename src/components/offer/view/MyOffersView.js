import React, {useEffect} from "react";
import Api from "common/api-communication";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FETCH_MY_OFFERS, REPLACE_MYOFFERS_FILTER} from "redux/actions";
import {withRouter} from "react-router-dom";
import {MY_OFFERS} from "common/paths";
import OffersGrid from "components/offer/OffersGrid";
import PaginationComponent from "components/PaginationComponent";
import {useTranslation} from "react-i18next";
import {objectEquals} from "common/object-helper";
import {filterMatchesUrl} from "common/filter-helper";
import TitleComponent from "components/TitleComponent";
import {offerPropType} from "common/prop-types";

function MyOffersView(props) {
  const { t } = useTranslation();
  const {
    offers,
    location,
    history,
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
    if (newFilter.page !== pageQuery) {
      dispatch({
        type: REPLACE_MYOFFERS_FILTER,
        payload: { page: pageQuery },
      });
    } else if (
      filterMatchesUrl(newFilter, search) &&
      !objectEquals(currentFilter, newFilter)
    ) {
      dispatch(Api.getMyOffers(newFilter.page - 1, userId, FETCH_MY_OFFERS));
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
      <TitleComponent content={t('user.myProfile')}/>
      {objectEquals(currentFilter, newFilter) ? (
        offers && offers.length > 0 ? (
          <>
            <OffersGrid
              myOffers={true}
              offers={offers}
              offerLinkBase={MY_OFFERS}

            />
          </>
        ) : (
          t("noOffersFound")
        )
      ) : null}
      <PaginationComponent totalPages={totalPages} />
    </>
  );
}

MyOffersView.propTypes = {
  userId: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerPropType),
  totalPages: PropTypes.number,
};

export default connect((state) => ({
  userId: state.me.id,
  offers: state.myoffers.content,
  totalPages: state.myoffers.totalPages,
  currentFilter: state.myoffers.currentFilter,
  newFilter: state.myoffers.newFilter,
}))(withRouter(MyOffersView));
