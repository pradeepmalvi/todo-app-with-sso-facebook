import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { addTodo, updateTodos } from "../store/actions";
import Loader from "../components/Loader";
import uuid from "react-uuid";

const customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddExpenseModal({
  modalIsOpen,
  onClose,
  editMode,
  editTodo,
  setEditMode
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAccess, setUserAccess] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("wealth_user"));
  const todos = useSelector((state) => state.home.todos);

  useEffect(() => {
    if (userDetails) {
      setUserAccess(userDetails);
    }
  }, []);

  useEffect(() => {
    if (editMode) {
      setValues({
        ...values,
        title: editTodo.title,
      });
    }
  }, [editMode]);

  const onInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    error && setError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (editMode) {
      let updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, title: values.title } : todo
      );
      dispatch(updateTodos(updatedTodos));
      setEditMode(false);
    } else {
      const data = {
        id: uuid(),
        user: userDetails,
        title: values.title,
        completed: false,
      };

      dispatch(addTodo([data, ...todos]));
    }
    setLoading(false);
    setValues({});
    onClose();
  };

  const closeModal = () => {
    onClose();
    setValues({});
    setEditMode(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between mb-5">
            <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
              {editMode ? "Edit" : "Add"} Todo
            </h5>
            <button className="text-black-100" onClick={closeModal}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
                id="title"
                placeholder={`Enter title`}
                value={values.title}
                name="title"
                onChange={onInputChange}
                required
              />
              {loading ? (
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-8 py-3 mb-2">
                  <Loader width={"w-4"} />
                </button>
              ) : (
                <button
                  type="submit"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2 mb-2"
                >
                  {loading ? (
                    <Loader width={"w-4"} />
                  ) : editMode ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
              )}
            </div>
            {error && (
              <div
                class="p-3 text-sm bg-red-200 text-red-700 rounded mt-3 transition duration-150 ease-in-out"
                role="alert"
              >
                {error}
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}
