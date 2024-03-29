import {Paper} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import React from 'react';
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "common/api-communication";
import {PAPER_ELEVATION} from 'common/app-constants';
import {SETTINGS} from "common/paths";
import TitleComponent from "components/TitleComponent";
import ChangePasswordForm from "components/user/ChangePasswordForm";


function ChangProfilePasswordView(props) {

  const {t} = useTranslation();

  const [infoText, setInfoText] = React.useState(null);

  const handleSubmit = (data, actions) => {
    actions.setSubmitting(true);
    Api.changeProfilePassword(data).payload.then(response => {
      if (!response.error) {
        setInfoText(t('user.password.changeSuccess'));
      } else if (response.status && response.status === 400) {
        setInfoText(response.errors[0].defaultMessage);
      }
    }).finally(() => actions.setSubmitting(false));
  };

  return (
      <>
        <TitleComponent content={t('user.password.change')}/>
        <Paper elevation={PAPER_ELEVATION} square className={'form-container'}>
          {infoText ?
              <>
                <div>
                  {infoText}
                </div>
                <Button size={"small"} variant="contained" color="primary" type="submit"
                        onClick={() => props.history.push(SETTINGS)}>
                  {t('settings.page')}
                </Button>
              </> :
              <ChangePasswordForm onSubmit={handleSubmit}/>
          }
        </Paper>
      </>
  );
}

ChangProfilePasswordView.propTypes = {};

export default connect(state => ({}))(withRouter(ChangProfilePasswordView));
