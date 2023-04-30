import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import AddTodoModal from "../modals/AddTodoModal";
import { useDispatch, useSelector } from "react-redux";
import { updateTodos } from "../store/actions";

export default function Section() {
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [todoModal, setTodoModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  const todos = useSelector((state) => state.home.todos);

  const onCheck = (id) => {
    let updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    dispatch(updateTodos(updatedTodos));
  };

  const onEdit = (todo) => {
    setEditMode(true);
    setEditTodo(todo);
    setTodoModal(true);
  };

  const onDelete = (id) => {
    let updatedTodos = todos.filter((todo) => todo.id !== id);
    dispatch(updateTodos(updatedTodos));
  };

  return (
    <>
      <div className="mt-10">
        <div className="bg-gray-200 px-10 py-10 flex justify-between">
          <div class="relative text-gray-600">
            <input
              class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded text-sm focus:outline-none"
              type="search"
              name="search"
              onChange={(e) => setSearchFilter(e.target.value)}
              value={searchFilter}
              placeholder="Search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-2 mr-4">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="bg-gray-200 flex justify-between items-start">
            <a class="flex items-center justify-between px-10 text-center ml-5 py-1 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">
                {todos.filter((todo) => !todo.completed)?.length}
              </h5>
              <p class="font-normal text-gray-400 ml-5">Todos</p>
            </a>
            <a class="flex items-center justify-between px-10 text-center ml-5 py-1 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
              <h5 class="text-2xl font-bold tracking-tight text-green-500">
                {todos.filter((todo) => todo.completed)?.length}
              </h5>
              <p class="font-normal text-gray-400 ml-5">Completed</p>
            </a>
          </div>
        </div>

        {loading ? (
          <div className="bg-gray-200 px-10 py-10 flex justify-center min-h-[60vh]">
            <Loader width={"w-10"} />
          </div>
        ) : (
          <div className="bg-gray-200 px-10 flex min-h-[60vh]">
            <div className="w-full mr-5">
              <div className="flex justify-between">
                <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
                  Todo
                </h5>
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 mb-2"
                  onClick={() => setTodoModal(true)}
                >
                  Add Todo
                </button>
              </div>

              <ul className="text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200 bg-white-700">
                {todos.some((todo) => !todo.completed) ? (
                  todos
                    ?.filter(
                      (todo) =>
                        todo.title
                          .toLowerCase()
                          .indexOf(searchFilter.toLowerCase()) != -1
                    )
                    ?.map(
                      (todo, key) =>
                        !todo?.completed && (
                          <li
                            key={key}
                            className="py-2 px-4 w-full rounded-t-lg border-b border-white-200 flex justify-between"
                          >
                            <div className="flex justify-between w-full">
                              <div className="flex items-start">
                                <div
                                  className="bg-gray-500 text-gray-500 px-1 rounded cursor-pointer"
                                  onClick={() => onCheck(todo.id)}
                                >
                                  <i className="fa fa-check"></i>
                                </div>
                                <span className="ml-5">{todo.title}</span>
                              </div>
                              <div className="flex">
                                <div
                                  className="cursor-pointer ml-5"
                                  onClick={() => onEdit(todo)}
                                >
                                  <i className="fa fa-pencil"></i>
                                </div>
                                <div
                                  className="cursor-pointer ml-5"
                                  onClick={() => onDelete(todo.id)}
                                >
                                  <i className="fa fa-times"></i>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                    )
                ) : (
                  <li className="py-2 px-4 w-full uppercase rounded-t-lg border-b border-white-200 flex justify-between">
                    No Data Available
                  </li>
                )}
              </ul>
            </div>
            <div className="w-full ml-5">
              <div className="flex justify-between">
                <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
                  Completed
                </h5>
              </div>

              <ul className="text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200 bg-white-700">
                {todos.some((todo) => todo.completed) ? (
                  todos
                    ?.filter(
                      (todo) =>
                        todo.title
                          .toLowerCase()
                          .indexOf(searchFilter.toLowerCase()) != -1
                    )
                    .map(
                      (todo, key) =>
                        todo?.completed && (
                          <li
                            key={key}
                            className="py-2 px-4 w-full rounded-t-lg border-b border-white-200 flex justify-between"
                          >
                            <div className="flex justify-between w-full">
                              <div className="flex items-start">
                                <div
                                  className="bg-gray-500 bg-green-500 text-white px-1 rounded cursor-pointer"
                                  onClick={() => onCheck(todo.id)}
                                >
                                  <i className="fa fa-check"></i>
                                </div>
                                <span className="ml-5">{todo.title}</span>
                              </div>
                              <div
                                className="cursor-pointer ml-5"
                                onClick={() => onDelete(todo.id)}
                              >
                                <i className="fa fa-times"></i>
                              </div>
                            </div>
                          </li>
                        )
                    )
                ) : (
                  <li className="py-2 px-4 w-full uppercase rounded-t-lg border-b border-white-200 flex justify-between">
                    No Data Available
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
        <AddTodoModal
          setEditMode={setEditMode}
          editMode={editMode}
          editTodo={editTodo}
          modalIsOpen={todoModal}
          onClose={() => setTodoModal(false)}
        />
      </div>
    </>
  );
}
