import { SET_TODO, SET_USER_DETAIL, UPDATE_TODO } from "./types";
import { toast } from "react-toastify";

// toast.success(res.data.message);

export const setUserDetail = (data) => (dispatch) => {
  localStorage.setItem("ta-user", JSON.stringify(data));
  dispatch({
    type: SET_USER_DETAIL,
    payload: data,
  });
};

export const addTodo = (data) => (dispatch) => {
  updateLocalTodos(data);
  dispatch({
    type: SET_TODO,
    payload: data,
  });
};

export const updateTodos = (data) => (dispatch) => {
  updateLocalTodos(data);
  dispatch({
    type: UPDATE_TODO,
    payload: data,
  });
};

export const updateLocalTodos = (todos) => {
  localStorage.setItem("ta-todos", JSON.stringify(todos));
};
