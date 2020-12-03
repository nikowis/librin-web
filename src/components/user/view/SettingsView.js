import {Grid, Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "common/api-communication";
import {PAPER_ELEVATION} from "common/app-constants";
import {PROFILE_CHANGE_PASSWORD} from "common/paths";
import DeleteAccountDialog from "components/user/settings/DeleteAccountDialog";
import TitleComponent from "components/TitleComponent";
import PreferencesForm from "components/user/settings/PreferencesForm";
import PersonalDataForm from "components/user/settings/PersonalDataForm";

function SettingsView(props) {

  const {t} = useTranslation();
  const {dispatch, email} = props;

  useEffect(() => {
    if (email === null) {
      dispatch(Api.getMe());
    }
  }, [dispatch, email]);

  return (
      <>
        <TitleComponent content={t('settings.title')}/>
        <Grid container justify="center" spacing={1}>
          <Grid item sm={12} md={4}>
            <PreferencesForm/>
          </Grid>
          <Grid item sm={12} md={4}>
            <PersonalDataForm/>
          </Grid>
        </Grid>
        <Paper elevation={PAPER_ELEVATION} square className={'action-buttons-bar form-container'}>
          <Button size={"small"} variant="outlined" color="primary" type="submit"
                  onClick={() => props.history.push(PROFILE_CHANGE_PASSWORD)}>
            {t('user.password.change')}
          </Button>
          <DeleteAccountDialog/>
        </Paper>
      </>
  );

}

SettingsView.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
};

export default connect(state => ({
  id: state.me.id,
  email: state.me.email,
  firstName: state.me.firstName,
  lastName: state.me.lastName,
  username: state.me.username,
}))(withRouter(SettingsView));
