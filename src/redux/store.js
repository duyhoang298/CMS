// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import createHistory from 'history/createBrowserHistory';
// import { routerReducer, routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';
// import reducers from './reducers/index';
// import rootSaga from './sagas/index';

// const history = createHistory();
// const sagaMiddleware = createSagaMiddleware();
// const routeMiddleware = routerMiddleware(history);
// const middlewares = [thunk, sagaMiddleware, routeMiddleware];

// const store = createStore(
//   combineReducers({
//     ...reducers,
//     router: routerReducer
//   }),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   compose(applyMiddleware(...middlewares))
// );
// sagaMiddleware.run(rootSaga);
// export { store, history };

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import rootSaga from './sagas';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

const persistConfig = {
  key: 'Real-Estate',
  storage,
  // debounce: 500,
  blacklist: ['ui', 'requests', 'Ecommerce', 'Package']
};
const allReducer = combineReducers({
  ...reducers,
  router: routerReducer
});
const persistedReducer = persistReducer(persistConfig, allReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export { history };
export default store;
