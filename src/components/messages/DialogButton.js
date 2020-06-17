import React from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogButton(props) {

    const [open, setOpen] = React.useState(false);

    const {
        className, size, variant, disabled, buttonText, dialogFullWidth,
        dialogMaxWidth, dialogTitle, dialogContent, dialogYesText, dialogNoText,
        onYesClick
    } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        onYesClick();
        handleClose();
    };

    return (
        <>
            <Button className={className} size={size} variant={variant} disabled={disabled} onClick={handleClickOpen}>
                {buttonText}
            </Button>
            <Dialog
                open={open}
                keepMounted
                fullWidth={dialogFullWidth}
                maxWidth={dialogMaxWidth}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {dialogNoText ?
                        <Button onClick={handleClose} color="primary">
                            {dialogNoText}
                        </Button> : null
                    }
                    <Button onClick={handleYes} color="primary">
                        {dialogYesText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

DialogButton.propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    dialogMaxWidth: PropTypes.string,
    dialogFullWidth: PropTypes.bool,
    buttonText: PropTypes.string.isRequired,
    dialogTitle: PropTypes.string,
    dialogContent: PropTypes.string,
    dialogYesText: PropTypes.string.isRequired,
    dialogNoText: PropTypes.string,
    onYesClick: PropTypes.func.isRequired,
};

export default DialogButton;
