import React, {useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import {OFFERS} from "../../common/paths";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CLEAR_OFFERS} from "../../redux/actions";
import Api from "../../common/api-communication";
import InputBase from "@material-ui/core/InputBase";
import * as PropTypes from "prop-types";

function SearchComponent(props) {

    const TITLE = 'title';
    const AUTHOR = 'author';

    const [category, setCategory] = React.useState(TITLE);
    const [search, setSearch] = React.useState('');

    const {t} = useTranslation();
    const {history, location, dispatch} = props;

    const titleQuery = Api.getURLParam(location.search, TITLE);
    const authorQuery = Api.getURLParam(location.search, AUTHOR);
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

    const handleChangeSelect = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = (event) => {
        dispatch({type: CLEAR_OFFERS});
        if (search) {
            history.push(OFFERS + '?' + new URLSearchParams({[category]: search}).toString());
        } else {
            history.push(OFFERS);
        }
        event.preventDefault()
    };

    return (

        <form onSubmit={handleSubmit} className={"top-menu-search"}>
            <Select
                className={"search-select"}
                value={category}
                onChange={handleChangeSelect}
                MenuProps={{className: props.selectMenuClassName}}
            >
                <MenuItem value={TITLE}>Tytuł</MenuItem>
                <MenuItem value={AUTHOR}>Autor</MenuItem>
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
    selectMenuClassName: PropTypes.string.isRequired
};

export default connect(state => ({}))(withRouter(SearchComponent));