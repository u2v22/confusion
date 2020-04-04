import * as ActionTypes from './ActionTypes';

export const promotions = (state={
  isLoading: false,
  errMsg: null,
  promotions: []
}, action) => {
  switch(action.type) {
    case ActionTypes.ADD_PROMOTIONS:
      return {...state, isLoading: false, errMsg: null, promotions: action.payload };
    case ActionTypes.PROMOTIONS_LOADING:
      return {...state, isLoading: true, errMsg: action.payload, promotions: [] };
    case ActionTypes.PROMOTIONS_FAILED:
      return {...state, isLoading: false, errMsg: action.payload, promotions: [] };
    default:
      return state;
  }
}
