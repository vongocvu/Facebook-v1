import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind"

import navHeader from '../data/navHeader'
import Logo from "../logo"
import Search from '../search'
import IgnoreNav from "../navigation/ignore_nav"
import IgnoreCircle from "../navigation/ignore_circle"
import ToggleTheme from "../buttons/ToggleTheme";
import ListChats from "../listChats";

import styles from './Header.module.scss'
import { useState } from "react";

const cx = classNames.bind(styles)
const socket = require('socket.io-client')('http://localhost:8000')

const Header = () => {  
  const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector(state => ({ ...state }))
    const [ showMessenger, setShowMessage ]  = useState( false )

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
     
      return (
            <div className={cx('wrapper','grid grid-cols-12 px-3 secondary-bg fixed inset-0 border-b border-gray-100 b-bottom z-[50]')}>
                 <div className={cx('max-md:col-span-6 md:col-span-4 flex items-center')}>
                     <Logo/>
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
                            <IgnoreCircle onClick={e => 'notthing!'} to={data.path} tab_name={data.name} svg={data.icon}/>
                        </div>
                    ))
                  }
                      <IgnoreCircle onClick={logout} tab_name="Account" image={user?.avatar}/>
                 </div>
                 <div className={`absolute ${showMessenger && 'top-[100%] right-[0px] w-[400px] h-[800px] border b-full rounded-b-lg'}`}>
                     <ListChats chatGlobal={true} handlerShowMessage={handlerDispathRoom} show={showMessenger}/>
                 </div> 
            </div>
      )
}

export default Header