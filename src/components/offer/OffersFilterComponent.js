import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import {OfferFilterCategory, PAPER_ELEVATION} from "common/app-constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CHANGE_OFFERS_FILTER} from "redux/actions";
import {MAIN_VIEW} from "redux/offersReducer";
import Api from "common/api-communication";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import withWidth from "@material-ui/core/withWidth/withWidth";
import FilterListIcon from '@material-ui/icons/FilterList';
import Badge from "@material-ui/core/Badge";
import ClearIcon from '@material-ui/icons/Clear';

function OffersFilterComponent(props) {
    const {t} = useTranslation();
    const {location, history, currentFilter, newFilter, dispatch} = props;
    const {push} = history;
    const {search, pathname} = location;
    const verySmallScreen = /xs/.test(props.width);
    const [open, setOpen] = React.useState(!verySmallScreen);

    const handleCollapse = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const pageQuery = Api.getPageParam(search);
        let categoryQuery = Api.getURLParam(search, 'categories');
        let filterChanged = false;
        let changeFilter = {...newFilter};
        if(categoryQuery) {
          categoryQuery = categoryQuery.toUpperCase();
        }
        if (newFilter.categories !== categoryQuery) {
            changeFilter.categories = categoryQuery;
            filterChanged = true;
        }
        if (!isNaN(parseInt(pageQuery)) && newFilter.page !== parseInt(pageQuery)) {
            changeFilter.page = parseInt(pageQuery);
            filterChanged = true;
        }

        if (filterChanged) {
            dispatch({
                type: CHANGE_OFFERS_FILTER,
                view: MAIN_VIEW,
                payload: {...changeFilter},
            });
        }
    }, [dispatch, newFilter, search]);

    const changeFilter = (filterField, value) => {
        if (currentFilter[filterField] !== value) {
            const urlSearchParams = new URLSearchParams(history.location.search);
            if(value) {
                urlSearchParams.set(filterField, value.toLowerCase());
            } else {
                urlSearchParams.delete(filterField);
            }
            urlSearchParams.set("page", 1);
            push({
                pathname: pathname,
                search: "?" + urlSearchParams.toString(),
            });
        }
        setOpen(!verySmallScreen);
    };

    const categoryRows = () => {
        return OfferFilterCategory.map((cat) => {
            return (
                <ListItem button selected={newFilter.categories === cat.value} key={cat.name}
                          onClick={() => changeFilter("categories", cat.value)}>
                    <ListItemIcon>
                        <ArrowRightIcon fontSize={'small'}/>
                    </ListItemIcon>
                    <ListItemText primary={t("offer.category." + cat.name)}/>
                </ListItem>
            );
        });
    };

    return (
        <Paper elevation={PAPER_ELEVATION} square className={'categories-wrapper'}>
            <List component="nav">
                <ListItem button onClick={handleCollapse} className={'category-header'}>
                    <ListItemIcon>
                        <Badge variant={"dot"} badgeContent={newFilter.categories ? 1 : 0} color="primary">
                            <FilterListIcon fontSize={'small'}/>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary={t("offer.category.filter")}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="nav" className={'category-rows'} disablePadding>
                        {newFilter.categories ? (
                            <ListItem button key={'clear'} className={'category-clear'}
                                      onClick={() => changeFilter("categories", null)}>
                                <ListItemIcon>
                                    <ClearIcon fontSize={'small'}/>
                                </ListItemIcon>
                                <ListItemText primary={t("offer.category.clear")}/>
                            </ListItem>
                        ) : null}
                        {categoryRows()}
                    </List>
                </Collapse>
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
}))(withRouter(withWidth()(OffersFilterComponent)));
