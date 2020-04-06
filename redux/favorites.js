import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
  switch(ActionTypes){
    case ActionTypes.ADD_FAVORITE:
      if(state.some(element => element === action.payload)){
        return state;
      }
      else {
        return state.concat(action.payload);
      }
    default:
      return state;
  }
}