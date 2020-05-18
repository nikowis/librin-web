import React from 'react';
import PropTypes from "prop-types";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";

function TopMenuListItem(props) {
    const {show, selected, icon, text, key, onClick} = props;
    return (<>
            {show ?
                <MenuItem dense selected={selected} button key={key}
                          onClick={onClick}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                    <ListItemText primary={text}/>
                </MenuItem> : null
            }
        </>
    );


}

TopMenuListItem.propTypes = {
    show: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    icon: PropTypes.object,
    text: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
};

export default TopMenuListItem;
