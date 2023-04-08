/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { faCamera, faChevronDown, faCommentDots, faPen, faPlus, faUser, faUserPlus, faUserXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames/bind"
import axios from "axios"


import Header from "../Header"
import styles from "./profile.module.scss"

import ContentPost from '../posts/ContentPost'
import {

      followingUser, 
      unFollowingUser, 
      handlerConfirmRequest
} 
from "../functions/followingUser"
import LoadingChatBox from "../loadings/LoadingChatBox"
import { memo } from "react"


const cx = classNames.bind(styles)

const Profile = () => {

   const dispatch = useDispatch()
   const  { idUser } = useParams()
   const { user } = useSelector(state => ({ ...state }))

   const [ friends, setFriends ] = useState([])
   const [ Posts, setPosts ] = useState([])
   const [ followed, setFollowed ] = useState(false)
   const [ accessFriend, setAccessFriend ] = useState(false)
   const [ isFriend, setIsFriend ] = useState(false)
   const [ curentUser, setCurentUser ] = useState([])
   const [ showOptions, setShowOptions ] = useState(false)
   const [ loadding, setLoadding ] = useState(false)
   const [ hasMore, setHasMore ] = useState(true)
   const [ limit, setLimit ] = useState(3)

   const stickyBottom = useRef(null)
   const stickyTop = useRef(null)
   const gotoTopRef = useRef(null)
   const showOptionsRef = useRef(null)

   useEffect(() => {
      window.addEventListener('scroll', (e) => {
        const rectTop = stickyTop.current?.getBoundingClientRect()
        const rectBottom = stickyBottom.current?.getBoundingClientRect()

        if (rectTop?.top > 0 && window.innerWidth > 768) {
          stickyTop.current.style.position = 'sticky'
          stickyTop.current.style.top =  '70px'
        } else {
          stickyTop?.current?.classList.add('static')
        }
        
        if (Math.floor(rectBottom?.bottom) < window.innerHeight && window.innerWidth > 1023 && rectTop?.top < 0) {
          stickyTop.current.style.position = 'sticky'
          stickyTop.current.style.top = rectTop.top + 'px'
        } else {
          stickyTop?.current?.classList.add('static')
        }

      })
   },[])

    const fecthData = async () => {
        await axios.get(`${process.env.REACT_APP_API}/v1/post/getMyPosts/${idUser}/${limit}`)
        .then(response => {
            setPosts(response.data)
            if ( response.data.length < limit) {
              setHasMore(false)
            } else {
              setLimit(limit + 10)
            }
          })
      }
 
  useEffect(() => {
    fecthData()
  },[idUser])

  const fetchMoreData = () => {
    hasMore && fecthData()
  }
   
   useEffect(() => {
       const fecthData = async () => {
          setLoadding(true)
          const rq1 =  await axios.get(`${process.env.REACT_APP_API}/v1/auth/getOne/${idUser}`)
          const rq2 =  await axios.get(`${process.env.REACT_APP_API}/v1/auth/getOne/${user._id}`)

          const [res1, res2] = await axios.all([rq1, rq2])
            setFriends(res1.data.user)
            setCurentUser(res2.data.user)
            setLoadding(false)
       }
       fecthData()
   },[idUser])


  

   useEffect(() => {
    gotoTopRef?.current?.scrollIntoView()
    friends?.followings?.includes(curentUser?._id) && setFollowed(true)
   
    if (curentUser?.followings?.includes(friends?._id)) {
      setAccessFriend(true);
      if (curentUser?.friends?.some( friend => friend._id === friends._id)) {
        setIsFriend(true) && setAccessFriend(false);
      } 
    }
    
  },[ friends, curentUser])
                
   const handlerFollowing = () => {
    followingUser(user._id, idUser)
    setFollowed(true)
   }

   const handlerUnFollowing = () => {
     const result = unFollowingUser(user._id, idUser)
     if (result) {
       setFollowed(false)
       setAccessFriend(false)
       setIsFriend(false)
     }
   }

   const handlerConfirm = () => {
    handlerConfirmRequest( user._id, idUser )
    handlerConfirmRequest( idUser, user._id )
    followingUser(user._id, idUser )
    setIsFriend(true)
   }

   const handlerDeleteRequest = () => {
    const result = unFollowingUser(idUser, user._id)
    if (result) {
      setFollowed(false)
      setAccessFriend(false)
      setIsFriend(false)
    }
  }

  const showFormCreatePost = () => {
    dispatch({
        type: 'ON-FORM',
        payload: {
          type: "CreatePost",
          friends: friends
        }
    })
  }

  const showFormCreatePostPhotos = () => {
    dispatch({
        type: 'ON-FORM',
        payload: {
          type: "CreatePostPhotos",
          friends: friends
        }
    })
  }

  const showFormCreatePostFeeling = () => {
    dispatch({
        type: 'ON-FORM',
        payload: {
          type: "CreatePostFeeling",
          friends: friends
        }
    })
  }

  useEffect(() => {
    showOptionsRef?.current?.addEventListener('mouseover', () => {
      setShowOptions(true)
    })

    showOptionsRef?.current?.addEventListener('mouseout', () => {
      setShowOptions(false)
    })
  })

  const handlerUnFriend = async () => {
    setLoadding(true)
     await axios.post(`${process.env.REACT_APP_API}/v1/auth/unFriend/${user._id}`, {
         friend: friends._id
     })
     .then(response => {
       setFollowed(false)
       setAccessFriend(false);
       setIsFriend(false);
       setLoadding(false)
     })
  }

  return (
     <div className="w-full flex justify-center">
      {
        loadding &&
        <div className="fixed inset-0 z-50">
          <LoadingChatBox />
        </div>
      }
       <div ref={gotoTopRef}></div>
         <Header/>
         <div className="w-full flex flex-col items-center secondary-bg bg-white">
             <div className="w-[1300px] max-xl:w-full">
                  <div className="w-full h-[550px] rounded-xl overflow-hidden">
                     <img className="w-full h-full object-cover" src="https://4.bp.blogspot.com/-D0ohXhdFroI/UULSni2ZxkI/AAAAAAAAGTs/oJkWgYd0Rzo/s1600/Anh-bia-Nang-+(1).jpg" alt="anhbia" />
                  </div>
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
                          { user._id === idUser && 
                            <div className="flex items-end text-gray-800 dark:text-gray-300 ml-4 max-lg:my-5">
                              <button className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faPlus}/> Add to story</button>
                              <button className="px-4 bg-gray-700 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"> <FontAwesomeIcon icon={faPen}/> Edit profile</button>
                            </div>
                          }

                          { !accessFriend && user._id !== idUser && 
                            <div className="flex items-end text-gray-800 dark:text-gray-300 ml-4 max-lg:my-5">
                              { !followed && <button onClick={handlerFollowing} className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faUserPlus}/> Add friend</button> }
                              { followed && <button onClick={handlerUnFollowing} className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faUserPlus}/> Cancel request</button> }
                            </div>
                          }
                          {
                            accessFriend && !isFriend &&
                            <div className="flex items-end text-gray-800 dark:text-gray-300 ml-4 max-lg:my-5">
                              {  <button onClick={handlerConfirm} className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faUserPlus}/> Confirm request</button> }
                              {  <button onClick={handlerDeleteRequest} className="px-4 bg-gray-600 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faUserPlus}/> Delete request</button> }
                            </div>
                          }
                          {
                            user._id !== idUser && isFriend && 
                            <div className="flex items-end text-gray-800 dark:text-gray-300 ml-4 max-lg:my-5 relative">
                              <div className="h-auto" ref={showOptionsRef}>
                                  {  <button className="px-4 bg-gray-600 cart-bg py-2 ml-2 rounded-lg font-medium hover:rounded-bl-[0px] hover:text-blue-500 text-white "><FontAwesomeIcon icon={faUser}/> Friends <FontAwesomeIcon icon={faChevronDown}/></button> }
                                    {
                                      showOptions && 
                                      <div className="absolute right-[90%] top-[100%] pt-1 z-10">
                                          <div onClick={handlerUnFriend} className="flex mb-1 items-center rounded-tr-[0px] bg-gray-600 text-white dark:text-white dark:hover:text-red-500 cart-bg px-4 py-2 rounded-lg hover:text-red-500 cursor-pointer">
                                            <FontAwesomeIcon icon={faUserXmark} />
                                            <span className="ml-2">Unfriend</span>
                                          </div>
                                    </div>
                                    } 
                              </div>
                            {  <button className="px-4 bg-blue-500 py-2 ml-2 rounded-lg font-medium hover:opacity-80 text-white"><FontAwesomeIcon icon={faCommentDots}/> Messenger</button> }
                          </div>
                          }
                        </div>
                    </div>
                    <div className="sticky top-[70px]">
                        <div className="">
                          <hr className="border-t border-gray-300 pb-1"/>
                          <ul className="flex dark:text-gray-300 text-gray-900 max-lg:justify-center max-lg:flex-wrap">
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">Post</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">About</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">Friends</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">Photos</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">Videos</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">Check-ins</li>
                              <li className="px-5 py-4 font-medium hover-dark hover:bg-gray-200 cursor-pointer rounded-lg">More</li>
                          </ul>
                        </div>
                    </div>
                  </div>
             </div>
        <div className="w-full flex flex-col items-center primary-bg bg-white pt-4">
             <div className="w-[1300px] max-xl:w-full grid grid-cols-12 gap-4 max-lg:px-[0px] text-gray-800 dark:text-gray-300 px-[50px]">
                <div className=" h-body max-lg:h-auto max-lg:col-span-12 lg:col-span-5 max-lg:px-[0px] px-2 primary-bg" ref={stickyTop} >
                    <div className="w-full p-4 secondary-bg bg-white rounded-lg border mb-4 shadow-md shadow-gray-400 b-full dark:shadow-gray-900"  >
                        <div className="flex justify-between">
                             <Link to="#" className="font-bold text-xl hover:underline">Photos</Link>
                             <Link to="#" className="text-blue-500 hover:underline">See all photos</Link>
                        </div>
                        <div className="w-full grid grid-cols-12 gap-1 rounded-lg overflow-hidden mt-4">
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/05/hinh-avatar-doi-dep-2022-6-696x696.jpg?fit=700%2C20000&quality=95&ssl=1" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://phongreviews.com/wp-content/uploads/2022/11/anh-avatar-dep-cho-con-gai-ngau-1.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://demoda.vn/wp-content/uploads/2022/04/anh-avatar-dep-cho-con-gai.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjpj6_-YKv5MxnESevdbUJhSWU6-VO1lVibXxibESrZcxGnbqXO4ia1fMOiZ7tdDgiRUk&usqp=CAU" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://i.pinimg.com/564x/92/26/5c/92265c40c8e428122e0b32adc1994594.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://i.pinimg.com/736x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-avatar-ff-ngau.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://thuthuatnhanh.com/wp-content/uploads/2021/02/Anh-avatar-bua-cute-dep-390x390.jpg" alt="photos"/>
                           </div>
                           <div className="col-span-4 hover:opacity-80 cursor-pointer">
                              <img className="w-full max-h-[150px]" src="https://vapa.vn/wp-content/uploads/2022/12/anh-avatar-facebook-dep-001.jpg" alt="photos"/>
                           </div>
                        </div>
                    </div>

                    <div className="w-full p-4 secondary-bg bg-white rounded-lg mb-4 border mb-4 shadow-md shadow-gray-400 b-full dark:shadow-gray-900" ref={stickyBottom}>
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
                              <Link to={`/profile/${friend._id}`} key={index} className="col-span-4 hover:opacity-80 cursor-pointer">
                                <img className="min-h-[140px] w-full max-lg:min-h-[250px] mb-1 rounded-lg border b-full border-gray-300" src={friend?.avatar} alt="photos"/>
                                <h4 className="text-sm">{friend?.username}</h4>
                              </Link>
                            ))
                          }
                        </div>
                    </div>

                </div>
                  <div className="lg:col-span-7 max-lg:col-span-12 text-gray-800 dark:text-gray-300">
                          {
                            (isFriend || user._id === idUser) &&
                            <div className={cx("w-full bg-white shadow-md rounded-lg mb-5 secondary-bg border mb-4 shadow-md shadow-gray-400 b-full dark:shadow-gray-900")}>
                            <div onClick={showFormCreatePost} className={cx('flex py-[10px] px-[15px]')}>
                                <img className={cx("w-10 h-10 rounded-full mr-[10px]")}  src={user?.avatar} alt="anh"/>
                                <button className={cx("flex-1 bg-gray-100 text-left comment-bg hover:opacity-80 rounded-3xl px-3")}>{user._id !== idUser ? `Write somethings to ${friends?.username}` : `What's your on mind, ${user?.username}?`}</button>
                            </div>
                                 <hr className="b-full"/>
                            <div className={cx("w-full grid grid-cols-12 px-[10px] py-[3px] max-lg:flex max-lg:flex-wrap",'nav-story')}>
                                <div className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/c0dWho49-X3.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Live video</span>
                                </div>

                                <div onClick={showFormCreatePostPhotos} className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Photo/video</span>
                                </div>

                                <div onClick={showFormCreatePostFeeling} className={cx("col-span-4 flex place-content-center py-[15px] border-blue-600 items-center cursor-pointer hover-dark hover:bg-gray-100 mx-1 rounded-md")}>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png" alt=""/>
                                    <span className={cx("font-medium ml-2")}>Feeling/activity</span>
                                </div>
                            </div>
                        </div>
                          }
                            {
                               <InfiniteScroll
                                dataLength={Posts.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<h4 className="text-center my-4">Loading...</h4>}
                                endMessage={<div className="text-center my-4">It is the post last !</div>}
                            >
                                {
                                    Posts.map((post, i) => (    
                                            <ContentPost key={i}  data={post}/>
                                            )
                                        )
                                }

                            </InfiniteScroll>
                            }
                  </div>
                </div>
            </div>
         </div>
     </div>
  )
}

export default memo(Profile)