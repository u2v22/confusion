import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import DISHES from './dishes';
import COMMENTS from './comments';
import COMMENTS from './comments';
import LEADERS from './leaders';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes,
      comments,
      promotions,
      leaders
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}
