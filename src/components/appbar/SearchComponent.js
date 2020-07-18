import React, {useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CHANGE_OFFERS_FILTER} from "../../redux/actions";
import Api from "../../common/api-communication";
import InputBase from "@material-ui/core/InputBase";
import * as PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth/withWidth";
import {MAIN_VIEW} from "../../redux/offersReducer";

function SearchComponent(props) {

    const TITLE = 'title';
    const AUTHOR = 'author';

    const [category, setCategory] = React.useState(TITLE);
    const [search, setSearch] = React.useState('');
    const smallScreen = /xs|sm/.test(props.width);
    const {t} = useTranslation();
    const {history, location, dispatch, currentFilter, newFilter} = props;

    const searchQuery = location.search;
    const titleQuery = Api.getURLParam(searchQuery, TITLE);
    const authorQuery = Api.getURLParam(searchQuery, AUTHOR);
    useEffect(() => {
        if (titleQuery) {
            setCategory(TITLE);
            setSearch(titleQuery);
        } else if (authorQuery) {
            setCategory(AUTHOR);
            setSearch(authorQuery);
        } else {
            setCategory(TITLE);
            setSearch('');
        }

    }, [titleQuery, authorQuery]);

    useEffect(() => {
        const titleQuery = Api.getURLParam(searchQuery, TITLE);
        const authorQuery = Api.getURLParam(searchQuery, AUTHOR);
        let filterChanged = false;
        let changeFilter = {...newFilter};

        if (newFilter[TITLE] !== titleQuery || newFilter[AUTHOR] !== authorQuery) {
            changeFilter[TITLE] = titleQuery;
            changeFilter[AUTHOR] = authorQuery;
            filterChanged = true;
        }

        if (filterChanged) {
            dispatch({
                type: CHANGE_OFFERS_FILTER,
                view: MAIN_VIEW,
                payload: {...changeFilter},
            });
        }
    }, [dispatch, newFilter, searchQuery]);

    const handleChangeSelect = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        const value = search;
        if (currentFilter[category] !== value) {
            const urlSearchParams = new URLSearchParams(history.location.search);
            if (value) {
                urlSearchParams.set(category, value);
            } else {
                urlSearchParams.delete(category);
            }
            urlSearchParams.set("page", 1);
            urlSearchParams.delete(category === TITLE ? AUTHOR : TITLE);
            history.push(history.location.pathname + "?" + urlSearchParams.toString());
        }

        event.preventDefault()
    };

    return (

        <form onSubmit={handleSubmit} className={"top-menu-search"}>
            <Select
                className={"search-select"}
                value={category}
                onChange={handleChangeSelect}
                MenuProps={{
                    disableScrollLock: true,
                    className: smallScreen ? 'search-category-select-menu-second-row' : 'search-category-select-menu'
                }}
            >
                <MenuItem value={TITLE}>{t('offer.title')}</MenuItem>
                <MenuItem value={AUTHOR}>{t('offer.author')}</MenuItem>
            </Select>
            <InputBase
                className={"search-text-input"}
                value={search}
                placeholder={t('search')}
                onChange={handleChangeSearch}
            />
            <IconButton color="default" type={"submit"}>
                <SearchIcon/>
            </IconButton>
        </form>

    );
}

SearchComponent.propTypes = {
    currentFilter: PropTypes.object.isRequired,
    newFilter: PropTypes.object.isRequired,
};

export default connect(state => ({
    currentFilter: state.offers.mainView.currentFilter,
    newFilter: state.offers.mainView.newFilter,
}))(withRouter(withWidth()(SearchComponent)));