import * as ActionTypes from './ActionTypes';

export const leaders = (state={
  isLoading: false,
  errMsg: null,
  leaders: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_LEADERS:
      return {...state, isLoading: false, errMsg: null, leaders: action.payload };
    case ActionTypes.LEADERS_LOADING:
      return {...state, isLoading: true, errMsg: action.payload, leaders: [] };
    case ActionTypes.LEADERS_FAILED:
      return {...state, isLoading: false, errMsg: action.payload, leaders: [] };
    default:
      return state;
  }
}
