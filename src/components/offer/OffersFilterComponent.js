import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import {OfferCategory, PAPER_ELEVATION} from "../../common/app-constants";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CHANGE_OFFERS_FILTER} from "../../redux/actions";
import {MAIN_VIEW} from "../../redux/offersReducer";
import Api from "../../common/api-communication";
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
    const {replace} = history;
    const {search, pathname} = location;
    const smallScreen = /xs|sm/.test(props.width);
    const [open, setOpen] = React.useState(!smallScreen);

    const handleCollapse = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const pageQuery = Api.getPageParam(search);
        const categoryQuery = Api.getURLParam(search, 'category');
        let filterChanged = false;
        let changeFilter = {...newFilter};
        if (newFilter.category !== categoryQuery) {
            changeFilter.category = categoryQuery;
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
            const urlSearchParams = new URLSearchParams();
            if(value) {
                urlSearchParams.set(filterField, value);
            }
            urlSearchParams.set("page", 1);
            replace({
                pathname: pathname,
                search: "?" + urlSearchParams.toString(),
            });
        }
        setOpen(!smallScreen);
    };

    const categoryRows = () => {
        return OfferCategory.map((cat) => {
            return (
                <ListItem button selected={newFilter.category === cat.name} key={cat.name}
                          onClick={() => changeFilter("category", cat.name)}>
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
                        <Badge variant={"dot"} badgeContent={newFilter.category ? 1 : 0} color="primary">
                            <FilterListIcon fontSize={'small'}/>
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary={t("offer.category.filter")}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="nav" className={'category-rows'} disablePadding>
                        {newFilter.category ? (
                            <ListItem button key={'clear'} className={'category-clear'}
                                      onClick={() => changeFilter("category", null)}>
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
