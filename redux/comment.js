import * as ActionTypes from './ActionTypes';

export const comment = (state = {
  dishId: '',
  rating: '',
  author: '',
  comment: '',
  date: new Date().today()
}, action) => {
  switch(action.type){
    case ActionTypes.ADD_COMMENT:
      return {...state, dishId: action.payload.dishId,
                        rating: action.payload.rating,
                        author: action.payload.author,
                        comment: action.payload.comment,
                        date: action.payload.date
              }
    default:
      return state;
  }
}
