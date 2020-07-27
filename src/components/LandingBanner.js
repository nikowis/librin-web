import React from 'react';
import {useTranslation} from "react-i18next";
import Paper from "@material-ui/core/Paper/Paper";
import {PAPER_ELEVATION} from "../common/app-constants";
import Button from "@material-ui/core/Button";
import {LOGIN, REGISTER} from "../common/paths";
import {withRouter} from "react-router-dom";

function LandingBanner(props) {
  const {t} = useTranslation();

  const redirect = (to) => {
    props.history.push(to);
  };

  return (
      <Paper square elevation={PAPER_ELEVATION} className={'landing-banner'}>
        <div className={'text-col'}>
          <h2>
            {t('landingBanner')}
          </h2>
          <div>
          <Button size={"small"} variant="outlined" color="primary" onClick={() => redirect(LOGIN)}>
            {t('login.submit')}
          </Button>
          <Button size={"small"} variant="outlined" color="primary" onClick={() => redirect(REGISTER)}>
            {t('register.submit')}
          </Button>
          </div>
        </div>
        <div className={'img-col'}>
          <img className={'brand-logo'} src={process.env.PUBLIC_URL + '/book-background.jpg'}  alt={' '}/>
        </div>

      </Paper>
  );
}

LandingBanner.propTypes = {};

export default withRouter(LandingBanner);