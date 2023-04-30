import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [userAccess, setUserAccess] = useState(false);
  const userDetail = useSelector((state) => state.home.userDetail);

  useEffect(() => {
    if (userDetail) {
      setUserAccess(userDetail);
    }
  }, [userDetail]);

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav class="navbar bg-cyan-500 text-gray-800 fixed top-0 left-0 right-0 w-full flex flex-wrap items-center justify-between px-3 py-3 font-bold shadow-lg navbar navbar-expand-lg navbar-light">
        <span className="uppercase">Todo App</span>
        <span>
          {userAccess ? (
            <div className="flex">
              <span className="flex items-center mr-8">
                <img
                  src={userAccess?.picture?.data?.url}
                  alt={userAccess.name}
                  className="w-8 h-8 border rounded mr-2"
                />
                <span className="uppercase"> {userAccess.name}</span>
              </span>
              <button
                type="submit"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2"
              >
                Sign In
              </Link>
            </>
          )}
        </span>
      </nav>
    </>
  );
}
