import {Paper} from '@material-ui/core';
import PropTypes from "prop-types";
import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {useParams, withRouter} from 'react-router-dom';
import Api from "../../common/api-communication";
import {PAPER_ELEVATION, UserStatus} from '../../common/app-constants';
import MaxWidthContainer from "../MaxWidthContainer";
import {OFFERS} from "../../common/paths";
import ListSubheader from "@material-ui/core/ListSubheader";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import LoaderComponent from "../LoaderComponent";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Rating from "@material-ui/lab/Rating/Rating";
import {formatDateToString} from "../../common/date-utility";
import {CLEAR_CURRENT_USER} from "../../redux/actions";

function RatingsView(props) {
  const [loading, setLoading] = React.useState(false);

  const {dispatch, ratings, currentPage, totalPages, history, userId, username} = props;
  const {t} = useTranslation();

  let {id} = useParams();
  id = parseInt(id);
  const invalidId = isNaN(id);
  if (invalidId) {
    history.push(OFFERS);
  }

  const wrongUserIsLoaded = !userId || userId !== id;

  useEffect(() => {
    //load user entity
    if (!loading && wrongUserIsLoaded) {
      dispatch({type: CLEAR_CURRENT_USER});
      setLoading(true);
      dispatch(Api.getUser(id))
          .then((res) => {
            if (res.action.payload.status === 400) {
              history.replace(OFFERS);
            }
          })
          .then(() => setLoading(false));
    }
  }, [dispatch, history, id, wrongUserIsLoaded, loading]);

  useEffect(() => {
      dispatch(Api.getRatings(id));
  }, [dispatch, id]);

  const loadNextRatings = () => {
    dispatch(Api.getRatings(id, currentPage));
  };

  const loadPrevRatings = () => {
    dispatch(Api.getRatings(id, currentPage - 2));
  };

  const prevConversationLoader = currentPage > 1 ?
      <div className={'MuiButtonBase-root button'} onClick={() => loadPrevRatings()}>
        <ArrowBackIosIcon/>
        {t('messages.newer')}
      </div> :
      <div className={'MuiButtonBase-root button disabled'}>
        <ArrowBackIosIcon/>
        {t('messages.newer')}
      </div>;

  const nextConversationLoader = currentPage >= totalPages ?
      <div className={'MuiButtonBase-root button disabled'}>
        {t('messages.older')}
        <ArrowForwardIosIcon/>
      </div> :
      <div className={'MuiButtonBase-root button'} onClick={() => loadNextRatings()}>
        {t('messages.older')}
        <ArrowForwardIosIcon/>
      </div>;

  const ratingRows = () => {
    return ratings.map((rating) => {
      const author = rating.author;
      const accountDeleted = author.status === UserStatus.DELETED;
      return (
          <ListItem key={rating.id}>
            <div className={'list-datetime'}>
              {formatDateToString(rating.createdAt, true, true)}
            </div>
            <div className={'list-item'}>
              <ListItemAvatar>
                {accountDeleted ? <Avatar>{'?'}</Avatar> :
                    <Avatar>{author.username.substring(0, 1).toUpperCase()}</Avatar>}
              </ListItemAvatar>
              <ListItemText primary={accountDeleted ? t('user.accountIsDeleted') : author.username}
                            secondary={
                              <Rating
                                  readOnly
                                  size="small"
                                  value={rating.value}
                              />
                            }/>

            </div>
            <div>
              {rating.description}
            </div>
          </ListItem>
      );
    });
  };

  return (
      <MaxWidthContainer size={'sm'}>
        <Paper elevation={PAPER_ELEVATION} square className={'list-paging-navigation'}>
          {ratings ?
              <List subheader={<ListSubheader disableSticky>{t('offer.rating.listTitle') + ' ' + username}</ListSubheader>}>
                {ratingRows()}
                <Divider variant="fullWidth"/>
                <div className={'navigation-buttons'}>
                  {prevConversationLoader}
                  {nextConversationLoader}
                </div>
              </List>
              : <LoaderComponent/>
          }
        </Paper>
      </MaxWidthContainer>
  );
}

RatingsView.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  ratings: PropTypes.array
};

export default connect(state => ({
  userId: state.users.currentUser.id,
  username: state.users.currentUser.username,
  ratings: state.ratings.content,
  currentPage: state.ratings.currentPage,
  totalPages: state.ratings.totalPages,
}))(withRouter(RatingsView));
