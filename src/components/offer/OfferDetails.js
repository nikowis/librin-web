import React from 'react';
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {offerPropType} from "common/prop-types";
import ReportingComponent from "components/offer/ReportingComponent";
import TextWithLabel from "components/TextWithLabel";
import Rating from "@material-ui/lab/Rating/Rating";
import {convertConditionValueToInt, OfferStatus} from "common/app-constants";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button";
import WarningStrip from "components/WarningStrip";
import OfferStatusInfoBanner from "components/offer/OfferStatusInfoBanner";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Api from "common/api-communication";
import {CONVERSATIONS, LOGIN} from "common/paths";

function OfferDetails(props) {

  const {t} = useTranslation();
  const {currentOffer, dispatch, history, userId} = props;
  const {
    id,
    title,
    author,
    price,
    ownerId,
    status,
    description,
    category,
    condition,
  } = currentOffer;

  const [sendingMessage, setSendingMessage] = React.useState(false);

  const handleSendMessage = () => {
    if (props.authenticated && !sendingMessage) {
      setSendingMessage(true);
      dispatch(Api.createConversation(id)).then((res) => {
        setSendingMessage(false);
        history.push(CONVERSATIONS + "/" + res.value.id);
      });
    } else {
      history.push(LOGIN);
    }
  };

  return (
      <>
        <ReportingComponent offerId={id}/>
        <TextWithLabel mainClass={"primary-text"} name={'price'} label={t("offer.price")}
                       content={price + " " + t("currencySymbol")}/>

        <TextWithLabel mainClass={"secondary-text"} name={'title'} label={t("offer.title")}
                       content={title}/>

        <TextWithLabel mainClass={"secondary-text"} name={'author'} label={t("offer.author")}
                       content={author}/>

        <TextWithLabel mainClass={"secondary-text"} name={'description'} label={t("offer.description")}
                       content={description}/>

        <TextWithLabel mainClass={"secondary-text"} name={'category'} label={t("offer.category.label")}
                       content={t("offer.category." + category)}/>

        <div className={"secondary-text"}>
          <label htmlFor={"condition"}>{t("offer.condition.label")}</label>
          <div className={"condition-box"}>
            <Rating
                id="condition"
                name="condition"
                className={"condition-stars"}
                readOnly
                value={convertConditionValueToInt(condition)}
            />
            <span
                className={'condition-hint'}>{condition ? t('offer.condition.' + condition) : null}</span>
          </div>
        </div>
        {OfferStatus.ACTIVE === status ? (
            <CardActions>
              {ownerId !== userId ? (
                  <div className={'offer-actions'}>
                    <Button
                        size={"small"}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => handleSendMessage()}
                    >
                      {t("offer.sendMessage")}
                    </Button>
                  </div>
              ) : (
                  <WarningStrip text={t("offer.owner.myoffer")}/>
              )}
            </CardActions>
        ) : (
            <OfferStatusInfoBanner offer={props.currentOffer} userId={userId}/>
        )}
      </>
  );
}

OfferDetails.propTypes = {
  currentOffer: offerPropType,
  userId: PropTypes.number,
  authenticated: PropTypes.bool.isRequired,
};
export default connect((state) => ({
  currentOffer: state.offers.currentOffer,
  userId: state.me.id,
  authenticated: state.me.authenticated,
}))(withRouter(OfferDetails));
