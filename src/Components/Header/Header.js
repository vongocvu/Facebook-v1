/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind"

import navHeader from '../data/navHeader'
import Search from '../search'
import IgnoreNav from "../navigation/ignore_nav"
import IgnoreCircle from "../navigation/ignore_circle"
import ToggleTheme from "../buttons/ToggleTheme";
import ListChats from "../listChats";

import styles from './Header.module.scss'
import { memo, useRef, useState } from "react";
import { useEffect } from "react";

const cx = classNames.bind(styles)
const socket = require('socket.io-client')(process.env.REACT_APP_API)

const Header = () => {  
  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => ({ ...state }))
    const [ showMessenger, setShowMessage ]  = useState( false )
    const formMessRef = useRef(null)

    const logout = () => {
        Cookies.set('CURENT_USER', "")
        Cookies.set('ACCESS_TOKEN', "")
        Cookies.set('REFRESH_TOKEN', "")
        socket.emit('user_disconnected', user)

        dispatch({
          type: "LOGOUT",
        });
        navigate("/login");
      };    
      
      const HandlerShowMessenger = (name) => {
        name === 'Messenger' && setShowMessage(!showMessenger)
      }

      const handlerDispathRoom = (roomId) => {
        dispatch({
          type: 'ADD_ROOM',
          payload: roomId
        })
        setShowMessage(false)
      }

      useEffect(() => {
         const handleHideMessenger = (e) => {
           if (!formMessRef?.current?.contains(e.target) && !document.querySelector('.Messenger').contains(e.target)) {
              setShowMessage(false)
           }
         }
             window.addEventListener('click', handleHideMessenger)
          return () => {
            window.removeEventListener('click', handleHideMessenger)
         }
      })

      return (
            <div className={cx('wrapper','grid grid-cols-12 px-3 secondary-bg fixed inset-0 border-b border-gray-100 b-bottom z-[51]')}>
                 <div className={cx('max-md:col-span-6 md:col-span-4 flex items-center')}>
                     <Search/>
                 </div>
                 <div className={cx('max-md:hidden md:col-span-4 flex items-center justify-center h-full text-gray-600', 'nav_bar')}>
                    {
                        navHeader.navMiddle.map((data, index) => (
                          <IgnoreNav key={index} tab_name={data.name} to={data.path} icon={data.icon}/>
                        ))
                    }
                 </div>
                 <div className={cx('max-md:col-span-6 md:col-span-4 h-full items-center flex justify-end')}>
                  <ToggleTheme/>
                  {
                    navHeader.navRight.map((data, index) => (
                        <div key={index} onClick={e => HandlerShowMessenger(data.name)}>
                            <IgnoreCircle className={data.name} onClick={e => 'notthing!'} to={data.path} tab_name={data.name} svg={data.icon}/>
                        </div>
                    ))
                  }
                      <IgnoreCircle onClick={logout} tab_name="Account" image={user?.avatar}/>
                 </div>
                 <div ref={formMessRef} className={`absolute ${showMessenger && 'top-[100%] right-[0px] w-[400px] h-[800px] border b-full rounded-b-lg'}`}>
                     <ListChats chatGlobal={true} handlerShowMessage={handlerDispathRoom} show={showMessenger}/>
                 </div> 
            </div>
      )
}

export default memo(Header)