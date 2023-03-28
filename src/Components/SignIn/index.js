/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames/bind";
import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const SignIn = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch()

      const [ email, setEmail ] = useState('')
      const [ password, setPassword ] = useState('')
      const [ errEmail, setErrEmail ] = useState('')
      const [ errPassword, setErrPassword ] = useState('')

      const handleSubmit = async () => {
        try {
                const { data } = await axios.post('http://localhost:8000/v1/auth/login', {
                  email: email,
                  password: password
                })
                Cookies.set('CURENT_USER', JSON.stringify(data.user))
                Cookies.set('ACCESS_TOKEN', data.accessToken)
                Cookies.set('REFRESH_TOKEN', data.refreshToken)
                dispatch({ type: "LOGIN", payload: data.user });
                dispatch({type: "RESET_USER_ONLINE"})
                navigate("/");

        } catch (error) {
            if (error.response?.status === 401) {
                setErrEmail(error.response.data.message);
            }
    
            if (error.response?.status === 402) {
                setErrEmail("")
                setErrPassword(error.response.data.message);
            }
        }
      }

  return (
    <div className={cx("relative", "flex", "flex-col", "justify-center", "min-h-screen", "overflow-hidden", "bg-login")}>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800"> Email </label>
            <input 
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                    setErrEmail("")
                }}
                onKeyDown={e=> {
                  if (e.keyCode === 13) {
                    handleSubmit()
                  }
                }}
                type="email" 
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                <span className={cx('text-sm', 'text-red-500')}>{errEmail}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Password</label>
            <input
              value={password}
              onChange={ e => {
                setPassword(e.target.value)
                setErrPassword("")
              }}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                    handleSubmit()
                }
              }}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
             <span className={cx('text-sm', 'text-red-500')}>{errPassword}</span>
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">Forget Password?</a>
          <div className="mt-6">
            <button type="button" onClick={handleSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn
