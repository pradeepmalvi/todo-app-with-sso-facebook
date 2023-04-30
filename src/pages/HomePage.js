import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { setUserDetail, updateTodos } from "../store/actions";

export default function HomePage() {
  const dispatch = useDispatch();
  const [userAccess, setUserAccess] = useState(false);
  const userDetail = useSelector((state) => state.home.userDetail);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("ta-user"));
    const localTodos = JSON.parse(localStorage.getItem("ta-todos"));
    if (userDetails) {
      dispatch(setUserDetail(userDetails));
      dispatch(updateTodos(localTodos ? localTodos : []));
    }
    if (localStorage.getItem("ta-user")) {
      setUserAccess(true);
    }
  }, []);

  useEffect(() => {
    if (userDetail) {
      setUserAccess(true);
    }
  }, [userDetail]);

  return (
    <>
      <Navbar />
      {userAccess ? (
        <Section />
      ) : (
        <div className="bg-gray-200 px-10 py-10 flex items-center min-h-[100vh] main-page-bg">
          <h5 class="text-5xl mb-2 font-bold tracking-tight text-gray-900">
            Welcome to Todo App
          </h5>
        </div>
      )}

      <Footer />
    </>
  );
}
