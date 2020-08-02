import React from 'react';
import {useTranslation} from "react-i18next";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import ReportingDialog from "./ReportingDialog";
import PropTypes from "prop-types";

function ReportingComponent(props) {

  const {t} = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [formOpen, setFormOpen] = React.useState(false);

  const handleClickOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    handleClosePopover();
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'report-popover' : undefined;

  return (<>
    <ErrorOutlineIcon aria-describedby={id} onClick={handleOpenPopover} fontSize={'small'} className={'report-icon'}/>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
    >
      <Button className={'report-button'} onClick={handleClickOpenForm}>
        {t('user.report')}
      </Button>
    </Popover>
    <ReportingDialog open={formOpen} userId={props.userId} handleClose={handleCloseForm}/>
  </>);

}

ReportingComponent.propTypes = {
  userId: PropTypes.number,
};

export default ReportingComponent;