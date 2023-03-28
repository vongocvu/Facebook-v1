/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import classNames from "classnames/bind"

import Header from "../Header"
import styles from "./profile.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"

import Post from '../posts'


const cx = classNames.bind(styles)

const Profile = () => {

   const  { idUser } = useParams()
   const { user } = useSelector(state => ({ ...state }))

   const [ friends, setFriends ] = useState([])
   const [ Posts, setPosts ] = useState([])
   

   const stickyBottom = useRef(null)
   const stickyTop = useRef(null)
   
   const gotoTopRef = useRef(null)

   useEffect(() => {
      gotoTopRef?.current?.scrollIntoView()
   },[])


   useEffect(() => {
      window.addEventListener('scroll', (e) => {
        const rectTop = stickyTop.current?.getBoundingClientRect()
        const rectBottom = stickyBottom.current?.getBoundingClientRect()
        
        if (Math.floor(rectBottom?.bottom) < window.innerHeight && window.innerWidth > 1023) {
          stickyTop.current.style.position = 'sticky'
          stickyTop.current.style.top = rectTop.top + 'px'
        } else {
          stickyTop?.current?.classList.add('static')
        }

      })
   },[])

   useEffect(() => {
    const fecthData = async () => {
        await axios.get(`http://localhost:8000/v1/post/getMyPosts/${idUser}`)
        .then(response => {
            setPosts(response.data)
        })
    }
    fecthData()
  },[idUser])

   
   useEffect(() => {
       const fecthData = async () => {
           await axios.get(`http://localhost:8000/v1/auth/getOne/${idUser}`)
           .then(response => {
            setFriends(response.data.user)
           })
       }
       fecthData()
   },[idUser])

  return (
     <div className="w-full flex justify-center">
       <div ref={gotoTopRef}></div>
         <Header/>
         <div className="w-full flex flex-col items-center secondary-bg bg-white">
             <div className="w-[1300px] max-xl:w-full">
                  <div className="w-full h-[550px] bg-no-repeat bg-cover bg-center rounded-xl" style={{ 'backgroundImage': 'url(https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/289584335_1453462291781160_7449267342641262084_n.jpg?stp=cp6_dst-jpg_p720x720&_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_ohc=JZpv7XG5TU4AX8wuHdY&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfAYdEOoXLHFzVlNyyHqE1qLk1IASbniSKrG7_vni_tHyw&oe=642409EC'}}></div>
                  <div className="translate-y-[-20px] px-[50px] max-lg:translate-y-[-50px]">
                    <div className="flex mb-5 max-lg:flex-col max-lg:items-center">
                        <div className="w-[170px] h-[170px] max-lg:w-[200px] max-lg:h-[200px] rounded-full border-[4px] border-gray-900 relative hover:opacity-90 cursor-pointer">
                          <img className="rounded-full w-full h-full" src={friends?.avatar} alt="anhdaidiem" />
                          <FontAwesomeIcon className="absolute bottom-[5px] right-[5px] text-white z-10 text-xl bg-gray-700 p-2 rounded-full hover:opacity-90 " icon={faCamera}/>
                        </div>
                        <div className="flex justify-between flex-1 max-lg:flex-col max-lg:items-center">
                          <div className="flex flex-col justify-end text-gray-800 dark:text-gray-300 ml-4">
                            <h1 className="text-2xl font-bold max-lg:text-center">Võ Ngọc Vũ</h1>
                            <h3 className="my-1 font-medium max-lg:text-center max-lg:my-3">{friends.friends?.length} friends</h3>
                            <div className="flex">
                              {
                                friends.friends?.map((friend, index) => (
                                  <img className={cx("w-[40px] h-[40px] rounded-full")} key={index}  src={friend?.avatar} alt='friends'/>
                                ))
                              }
                            </div>
                          </div>
                          <div className="flex items-end text-gray-800 dark:text-gray-300 ml-4 max-lg:my-5">
                            <button className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faPlus}/> Add to story</button>
                            <button className="px-4 bg-gray-700 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"> <FontAwesomeIcon icon={faPen}/> Edit profile</button>
                          </div>
                        </div>
                    </div>
                    <div>
                        <div>
                          <hr className="dark:border-gray-900 border-gray-300 pb-1"/>
                          <ul className="flex dark:text-gray-300 text-gray-900 max-lg:justify-center max-lg:flex-wrap">
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">Post</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">About</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">Friends</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">Photos</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">Videos</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">Check-ins</li>
                              <li className="px-5 py-4 font-medium dark:hover:bg-gray-700 hover:bg-gray-200 cursor-pointer rounded-lg">More</li>
                          </ul>
                        </div>
                    </div>
                  </div>
             </div>
        <div className="w-full flex flex-col items-center primary-bg bg-white pt-4">
             <div className="w-[1300px] max-xl:w-full grid grid-cols-12 gap-4 max-lg:px-[0px] text-gray-800 dark:text-gray-300 px-[50px]">
                <div className=" h-body max-lg:h-auto max-lg:col-span-12 lg:col-span-5 max-lg:px-[0px] px-2 primary-bg" ref={stickyTop} >
                    <div className="w-full p-4 secondary-bg bg-white rounded-lg border mb-4 shadow-md shadow-gray-400 dark:border-gray-900 dark:shadow-gray-900"  >
                        <div className="flex justify-between">
                             <Link to="#" className="font-bold text-xl hover:underline">Photos</Link>
                             <Link to="#" className="text-blue-500 hover:underline">See all photos</Link>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-1 rounded-lg overflow-hidden mt-4">
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU" alt="photos"/>
                           </div>
                        </div>
                    </div>

                    <div className="w-full p-4 secondary-bg bg-white rounded-lg mb-4 border mb-4 shadow-md shadow-gray-400 dark:border-gray-900 dark:shadow-gray-900" ref={stickyBottom}>
                        <div className="flex justify-between">
                             <div>
                              <Link to="#" className="font-bold text-2xl hover:underline">Friends</Link>
                              <div className="">{friends.friends?.length} friends</div>
                             </div>
                             <Link to="#" className="text-blue-500 hover:underline">See all friends</Link>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-3 rounded-lg overflow-hidden mt-4 ">
                          {
                            friends.friends?.map((friend, index) => (
                              <div key={index} className="col-span-4 hover:opacity-80 cursor-pointer">
                                <img className="min-h-[140px] w-full max-lg:min-h-[250px] mb-1 rounded-lg border dark:border-gray-900 border-gray-300" src={friend?.avatar} alt="photos"/>
                                <h4 className="text-sm">{friend?.username}</h4>
                              </div>
                            ))
                          }
                        </div>
                    </div>

                </div>
                  <div className="lg:col-span-7 max-lg:col-span-12 text-gray-800 dark:text-gray-300">
                  <div className={cx("w-full bg-white shadow-md rounded-lg mb-5 secondary-bg border mb-4 shadow-md shadow-gray-400 dark:border-gray-900 dark:shadow-gray-900")}>
                            <div className={cx('flex py-[10px] px-[15px]')}>
                                <img className={cx("w-10 h-10 rounded-full mr-[10px]")}  src={user?.avatar} alt="anh"/>
                                <button className={cx("flex-1 bg-gray-100 text-left comment-bg hover:opacity-80 rounded-3xl px-3")}>What's on your mind ?</button>
                            </div>
                                 <hr className="dark:border-gray-900"/>
                            <div className={cx("w-full grid grid-cols-12 px-[10px] py-[3px] max-lg:flex max-lg:flex-wrap",'nav-story')}>
                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Live video</span>
                                </div>

                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Photo/video</span>
                                </div>

                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Feeling/activity</span>
                                </div>
                            </div>
                        </div>
                            {
                                Posts.map((post, i) => (    
                                        <Post key={i} data={post}/>
                                    )
                                )
                            }
                  </div>
                </div>
            </div>
         </div>
     </div>
  )
}

export default Profile