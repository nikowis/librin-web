import React, {useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import {OFFERS} from "../../common/paths";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CLEAR_OFFERS} from "../../redux/actions";
import Api from "../../common/api-communication";

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
        <div style={{backgroundColor: 'lightGray'}}>
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined">
                    <Select
                        value={category}
                        onChange={handleChangeSelect}
                    >
                        <MenuItem value={TITLE}>Tytuł</MenuItem>
                        <MenuItem value={AUTHOR}>Autor</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="input-with-icon-textfield"
                    label={t('search')}
                    value={search}
                    onChange={handleChangeSearch}
                />
                <IconButton color="default" type={"submit"}>
                    <SearchIcon/>
                </IconButton>
            </form>
        </div>
    );
}

SearchComponent.propTypes = {};

export default connect(state => ({}))(withRouter(SearchComponent));