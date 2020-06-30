import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import { PAPER_ELEVATION, OfferCategory } from "../../common/app-constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CHANGE_OFFERS_FILTER } from "../../redux/actions";
import { MAIN_VIEW } from "../../redux/offersReducer";
import Api from "../../common/api-communication";

function OffersFilterComponent(props) {
  const { t } = useTranslation();
  const { location, history, currentFilter, newFilter, dispatch } = props;
  const { replace } = history;
  const { search, pathname } = location;


  useEffect(() => {
    const pageQuery = Api.getPageParam(search);
    const categoryQuery = Api.getURLParam(search, 'category');
    let filterChanged = false;
    let changeFilter = {...newFilter};
    if (newFilter.category !== categoryQuery) {
      changeFilter.category = categoryQuery;
      filterChanged = true;
    } 
    if(!isNaN(parseInt(pageQuery)) && newFilter.page !== parseInt(pageQuery)) {
      changeFilter.page = parseInt(pageQuery);
      filterChanged = true;
    }

    if(filterChanged) {
      dispatch({
        type: CHANGE_OFFERS_FILTER,
        view: MAIN_VIEW,
        payload: {...changeFilter},
      });
    }
  }, [dispatch, newFilter, search]);

  const changeFilter = (filterField, value) => {
    if (currentFilter[filterField] !== value) {
      const urlSearchParams = new URLSearchParams();
      urlSearchParams.set(filterField, value);
      urlSearchParams.set("page", 1);
      replace({
        pathname: pathname,
        search: "?" + urlSearchParams.toString(),
      });
    }
  };

  const categoryRows = () => {
    return OfferCategory.map((cat) => {
      return (
        <ListItem button selected={newFilter.category === cat.name} key={cat.name} onClick={() => changeFilter("category", cat.name)}>
          <ListItemText primary={t("offer.category." + cat.name)} />
        </ListItem>
      );
    });
  };

  return (
    <Paper elevation={PAPER_ELEVATION} square>
      <List component="nav" subheader={t("offer.category.filter")}>
        {categoryRows()}
      </List>
    </Paper>
  );
}

OffersFilterComponent.propTypes = {
  currentFilter: PropTypes.object.isRequired,
  newFilter: PropTypes.object.isRequired,
};

export default connect((state) => ({
  currentFilter: state.offers.mainView.currentFilter,
  newFilter: state.offers.mainView.newFilter,
}))(withRouter(OffersFilterComponent));
