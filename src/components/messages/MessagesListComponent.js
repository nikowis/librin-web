import React, {useEffect, useRef} from 'react';
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import {formatDateToString} from "common/date-utility";
import List from "@material-ui/core/List";
import InfiniteScroll from 'react-infinite-scroller';
import LoaderComponent from "components/LoaderComponent";
import {conversationPropType} from "common/prop-types";

function MessagesListComponent(props) {

  const messagesEndRef = useRef(null);
  const [loading, setLoading] = React.useState(false);


  const {currentConversation, userId} = props;
  const {messages} = currentConversation;

  const scrollToBottom = () => {
    if (!loading) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(scrollToBottom, [currentConversation]);

  const messageRows = () => {
    return messages.map((msg) => {
      const myMsg = msg.createdBy.toString() === userId.toString();
      return (
          <ListItem key={msg.id} className={myMsg ? 'my-message' : 'notmy-message'}>
            <div className={'message-datetime'}>
              {formatDateToString(msg.createdAt, true, true)}
            </div>
            <div className={'message-content'}>
              {msg.content}
            </div>
          </ListItem>
      )
    });
  };

  return (
      <List className={'messages-list'}>
        {loading ? <LoaderComponent size={24}/> : null}
        <InfiniteScroll
            pageStart={0}
            loadMore={(page) => {
              if (!loading) {
                setLoading(true);
                props.loadMessages(page).then(() => {
                  setTimeout(() => {
                    setLoading(false);
                  }, 300);
                });
              }
            }}
            hasMore={!loading && !props.currentConversation.lastPage}
            initialLoad={false}
            isReverse={true}
            threshold={100}
            useWindow={false}
        >
          {messageRows()}
          <div ref={messagesEndRef}/>
        </InfiniteScroll>
      </List>
  );
}

MessagesListComponent.propTypes = {
  loadMessages: PropTypes.func.isRequired,
  userId: PropTypes.number,
  currentConversation: conversationPropType
};

export default MessagesListComponent;
