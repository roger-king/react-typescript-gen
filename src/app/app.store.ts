import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './services/reducers';
import thunk from 'redux-thunk';

// Import application stores
import DEFAULT_STATE from './services/states';

let enhancer: any = applyMiddleware(thunk);

let configureStore = () => {
    let store = createStore(appReducers, DEFAULT_STATE, enhancer);
    return store;
};

if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./app.devtools').DevTools;

    configureStore = () => {
        enhancer = compose(
            applyMiddleware(thunk),
            DevTools.instrument()
        );

        let store = createStore(
            appReducers,
            DEFAULT_STATE,
            enhancer);
        return store;
    };
}

export default configureStore;
