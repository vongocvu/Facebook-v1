/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames/bind";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import GoogleButton from "../SignInWithGoogle";


import styles from "./Login.module.scss";

const cx = classNames.bind(styles);



const SignIn = () => {

  
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  


  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/v1/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      Cookies.set("CURENT_USER", JSON.stringify(data.user));
      Cookies.set("ACCESS_TOKEN", data.accessToken);
      Cookies.set("REFRESH_TOKEN", data.refreshToken);
      dispatch({ type: "LOGIN", payload: data.user });
      dispatch({ type: "RESET_USER_ONLINE" });
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrEmail(error.response.data.message);
      }

      if (error.response?.status === 402) {
        setErrEmail("");
        setErrPassword(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section className="fixed inset-0 bg-black bg-opacity-90 secondary-bg w-full h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrEmail("");
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        handleSubmit();
                      }
                    }}
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <span className={cx("text-sm", "text-red-500")}>
                    {errEmail}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrPassword("");
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        handleSubmit();
                      }
                    }}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <span className={cx("text-sm", "text-red-500")}>
                    {errPassword}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <div className="flex-center">
                  <GoogleButton className/>
                </div>
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-black hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
