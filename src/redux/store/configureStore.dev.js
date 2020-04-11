import {applyMiddleware, createStore} from 'redux'
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger'
import rootReducer from '../rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from "redux-persist";

const configureStore = () => {
    const middleware = applyMiddleware(promise, createLogger());
    const store = createStore(
        rootReducer,
        {},
        composeWithDevTools(
            middleware
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../rootReducer', () => {
            store.replaceReducer(rootReducer)
        })
    }

    const persistor = persistStore(store);

    return {persistor, store};
};

export default configureStore
