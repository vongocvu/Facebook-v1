/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faClapperboard, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import axios from "axios"

import styles from "./home.module.scss";
import Stories from "../slides/Stories";
import IgnoreDynamic from '../navigation/ignore_dynamic'
import Header from '../Header'
import navBarHome from '../data/navBarHome'
import Store from '../data/Stories'
import Post from '../posts'
import UserList from "../UserList";
import GroupList from "../GroupList";
import CreateNewPost from "../forms/CreateNewPost"
import LoadingChatBox from "../loadings/LoadingChatBox";
const socket = require('socket.io-client')?.("https://sever-facebook-fake.vercel.app")

const cx = classNames.bind(styles);
const Home = () => {
  const dispatch = useDispatch()

  const { user, usersOnline } = useSelector(state => ({ ...state }))
  const [ Posts, setPosts ] = useState([])
  const [ loading, setLoading ] = useState(false)

     useEffect(() => {
        user && socket.emit('user_connected', user)
        user && socket.emit('get_users_online', user)
      },[])
  
      useEffect(() => {
          socket.once('UsersOnline', users => {
            usersOnline.length === 0 && dispatch({
                  type: "ADD_USERS_ONLINE",
                  payload: users
                })
            })
      },[])

      useEffect(() => {
        const fecthData = async () => {
            setLoading(true)
            await axios.get(`https://sever-facebook-fake.vercel.app/v1/post/getPosts/${user._id}`)
            .then(response => {
                setPosts(response.data)
                setLoading(false)
            })
        }
        fecthData()
      },[])


      useEffect(() => {
          socket.on('user_connecting', newUser => {
              const checkNewUser = user.friends.find(obj => obj._id === newUser._id)
              if (newUser._id !== user._id) {
                  if (checkNewUser && !usersOnline.some(user => user._id === newUser._id)) {
                    dispatch({
                        type: "ADD_USERS_ONLINE",
                        payload: [newUser]
                    })
                }
            }
        })
         return () => {
            socket.off('user_connecting')
         }
      },[usersOnline])


      useEffect(() => {
       
          socket.on('user_disconnecting', UserDisconnet => {
              const checkUserDisconnet = user.friends.find(obj => obj._id === UserDisconnet._id)
              if (checkUserDisconnet && usersOnline.some(user => user._id === UserDisconnet._id)) {
                    console.log('user is disconnecting');
                    dispatch({
                        type: "DELETE_USERS_ONLINE",
                        payload: UserDisconnet
                    })
                }
        })
        return () => {
            socket.off('user_disconnecting')
         }
      },[usersOnline])


      const showFormCreatePost = () => {
        dispatch({
            type: 'ON-FORM',
            payload: 'CreatePost'
        })
      }

      return (
        <>
           <div className="w-full flex flex-col bg-gray-100">
               <Header/>
               { loading && <LoadingChatBox/>}
               <div className="grid grid-cols-12 mt-[60px] primary-bg ">
                    <div className='max-lg:hidden h-body sm:max-lg:hidden lg:col-span-2 py-3 px-2 sticky left-0 top-[60px] primary-bg '>
                        {
                            navBarHome.navLeft.map((data, index) => (
                                <IgnoreDynamic key={index} text={data.name} svg={data.icon} to={data.path}/>
                            ))
                        }
                    </div>

                    <div className="max-md:col-span-12 md:col-span-8 flex flex-col items-center mt-4 primary-bg  dark:text-white">           
                        <div className="w-[700px] max-md:w-[98%] max-lg:w-[600px] bg-white shadow-md rounded-lg mb-5 secondary-bg border b-full">
                        <div className={cx("w-full grid grid-cols-12 px-[10px] py-[3px]",'nav-story')}>
                            <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md",'active')}>
                                <FontAwesomeIcon icon={faBookOpenReader} className={cx("text-xl mr-2 ")}/>
                                <span className={cx("font-medium")}>Stories</span>
                            </div>
                            <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                <FontAwesomeIcon icon={faClapperboard} className={cx("text-xl mr-2 ")}/>
                                <span className={cx("font-medium")}>Reels</span>
                            </div>
                            <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                <FontAwesomeIcon icon={faVideo} className={cx("text-xl mr-2 ")}/>
                                <span className={cx("font-medium")}>Rooms</span>
                            </div>
                        </div>
                              <hr className={cx("border b-full")}/>
                            <Stories Store={Store}/>
                      </div>

                        <div className={cx("w-[700px] max-md:w-[98%] max-lg:w-[600px] bg-white b-full border shadow-md rounded-lg mb-5 secondary-bg")}>
                            <div className={cx('flex py-[10px] px-[15px]')}>
                                <img className={cx("w-10 h-10 rounded-full mr-[10px]")}  src={user?.avatar} alt="anh"/>
                                <button onClick={showFormCreatePost} className={cx("flex-1 text-left bg-gray-100 comment-bg hover:opacity-80 rounded-3xl px-3")}>What's on your mind ?</button>
                            </div>
                                 <hr className="b-full"/>
                            <div className={cx("w-full grid grid-cols-12 px-[10px] py-[3px]",'nav-story')}>
                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Live video</span>
                                </div>

                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Photo/video</span>
                                </div>

                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Feeling/activity</span>
                                </div>
                            </div>
                        </div>
                            <div className="w-[700px] max-md:w-[98%] max-lg:w-[600px] rounded-lg">
                                {
                                    Posts.map((post, i) => (    
                                            <Post key={i}  data={post}/>
                                            )
                                        )
                                }
                            </div>
                        </div>

                    <div className="max-md:hidden primary-bg  h-body md:col-span-4 lg:col-span-2 flex flex-col items-center sticky left-0 top-[60px] overflow-y-scroll custom_scroll">
                            <UserList/>
                            <GroupList/>
                    </div>
                </div>
              </div>
              <CreateNewPost/>
             <Outlet/>
            </>
      )
}

export default Home