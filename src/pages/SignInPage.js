import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import FacebookLogin from "react-facebook-login";

import Loader from "../components/Loader";
import { FaFacebook } from "react-icons/fa";
import { setUserDetail } from "../store/actions";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const userDetail = useSelector((state) => state.home.userDetail);

  useEffect(() => {
    if (userDetail) {
      navigate("/");
    }
  }, [userDetail]);

  const onInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const responseFacebook = (response) => {
    setLoading(true);
    dispatch(setUserDetail(response));
  };

  return (
    <div className="login-wrapper flex"> 
      <div className="left-section text-center">
        <h1 className="text-cyan-500 uppercase font-bold text-5xl">Todo App</h1>
      </div>
      <div className="right-section"> 
        <p className="my-5 uppercase font-bold text-cyan-500 text-3xl">
          Sign In
        </p> 
        <div>
          <FacebookLogin
            appId="1369384800301338"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="flex items-center justify-center w-full px-4 py-2 mt-2 space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform border rounded-lg hover:bg-gray-600"
            icon={<FaFacebook style={{ marginRight: "5px" }} />}
          />

          {error && (
            <div
              class="p-3 text-sm bg-red-200 text-red-700 rounded mt-3 transition duration-150 ease-in-out"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
