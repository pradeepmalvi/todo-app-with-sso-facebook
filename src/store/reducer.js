import { SET_TODO, SET_USER_DETAIL, UPDATE_TODO } from "./types";

export const reducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case SET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};
