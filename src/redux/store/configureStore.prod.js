import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../rootReducer'
import promise from "redux-promise-middleware";
import {persistStore} from "redux-persist";

const configureStore = () => {

    const store = createStore(
        rootReducer,
        {},
        applyMiddleware(promise)
    );

    const persistor = persistStore(store);

    return {persistor, store};
};

export default configureStore
