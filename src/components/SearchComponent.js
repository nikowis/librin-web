import React from 'react';
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import {OFFERS} from "../common/paths";
import IconButton from "@material-ui/core/IconButton";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {CLEAR_OFFERS} from "../redux/actions";

function SearchComponent(props) {

    const [category, setCategory] = React.useState('title');
    const [search, setSearch] = React.useState('');

    const {t} = useTranslation();
    const {history, dispatch} = props;

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
                        <MenuItem value={'title'}>Tytuł</MenuItem>
                        <MenuItem value={'author'}>Autor</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="input-with-icon-textfield"
                    label={t('search')}
                    value={search}
                    onChange={handleChangeSearch}
                />
                <IconButton color="default">
                    <SearchIcon/>
                </IconButton>
            </form>
        </div>
    );
}

SearchComponent.propTypes = {};

export default connect(state => ({}))(withRouter(SearchComponent));