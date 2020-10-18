import React, {useEffect} from "react";
import {connect} from "react-redux";

import {withRouter} from "react-router-dom";
import OffersGrid from "./OffersGrid";
import PaginationComponent from "../PaginationComponent";
import PropTypes from "prop-types";
import Api from "../../common/api-communication";
import {FETCH_MAINVIEW_OFFERS} from "../../redux/actions";
import {useTranslation} from "react-i18next";
import {objectEquals} from "../../common/object-helper";
import {OFFERS} from "../../common/paths";
import {Grid} from "@material-ui/core";
import OffersFilterComponent from "./OffersFilterComponent";
import {filterMatchesUrl} from "../../common/filter-helper";
import LandingBanner from "../LandingBanner";

function OffersView(props) {
  const {t} = useTranslation();
  const {
    offers,
    location,
    totalPages,
    currentFilter,
    newFilter,
    dispatch,
  } = props;
  const {search} = location;

  useEffect(() => {
    if (filterMatchesUrl(newFilter, search) && !objectEquals(currentFilter, newFilter)) {
      dispatch(Api.getOffers(newFilter, FETCH_MAINVIEW_OFFERS));
    }
  }, [dispatch, search, currentFilter, newFilter]);

  return (
      <>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} md={2}>
            <OffersFilterComponent/>
          </Grid>
          <Grid item xs={12} sm={8} md={10} >
            {objectEquals(currentFilter, newFilter) ? (
                offers && offers.length > 0 ? (
                    <>
                      {props.authenticated ? null : <LandingBanner/>}
                      <OffersGrid
                          offers={offers}
                          offerLinkBase={OFFERS}
                      />
                    </>
                ) : (
                    t("noElementsFound")
                )
            ) : null}
            <PaginationComponent totalPages={totalPages}/>
          </Grid>
        </Grid>
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
        photo: PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        }),
      })
  ),
  totalPages: PropTypes.number,
  myOffers: PropTypes.bool,
  authenticated: PropTypes.bool,
  currentFilter: PropTypes.object.isRequired,
  newFilter: PropTypes.object.isRequired,
};

export default connect((state) => ({
  authenticated: state.me.authenticated,
  offers: state.offers.mainView.content,
  totalPages: state.offers.mainView.totalPages,
  currentFilter: state.offers.mainView.currentFilter,
  newFilter: state.offers.mainView.newFilter,
}))(withRouter(OffersView));
