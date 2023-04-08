/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import ReactsForm from "../forms/likeForm"
import { useEffect, useRef, useState } from "react"

import { likePost, cancelLikePost } from "../functions/likePost";
import { useSelector } from "react-redux";
import { memo } from "react";


const CommentLayout = ({ handlerCommenting, data, getLike}) => {

    const navigate = useNavigate() 

    const likeBtnRef = useRef(null)
    const FormLike = useRef(null)

    const { user } = useSelector(state => ({ ...state }))

    const [ Liked, setLiked ] = useState({})
    const [ showLike, setShowLike ] = useState(false)
    const [ totalLike, setTotalLike ] = useState(data?.react?.length)
    const [ LikeIcons, setLikeIcons ] = useState([])

    const initLike = {
      user: user, 
      reactName: 'Like', 
      reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png", 
      reactColor: 'rgb(32, 120, 244)'
    }
    
      const handleShowForm = () => {
        setShowLike(true)    
      }

      const handleHideForm = () => {
        setShowLike(false) 
      }

    useEffect(() => {
      setLiked({})
      data?.react?.forEach(like => {
        like.user._id === user._id && setLiked(like)
      })

      data?.react && setLikeIcons(data?.react?.filter((obj, index, self) =>
          index === self?.findIndex((t) => (
               t?.reactName === obj?.reactName
            )
          )
        )
      )
    },[data?.react])

    const handlerLiked = () => {
      if (Object.keys(Liked).length !== 0) {
      getLike && getLike([], data._id)
        setLiked({})
        cancelLikePost(data._id, user._id, "comment")
        setTotalLike(totalLike - 1)
        LikeIcons?.some(other => other.user._id === user._id) && setLikeIcons(LikeIcons?.filter(item => item.user._id !== user._id))
      }
  
      if (Object.keys(Liked).length === 0) {
        !LikeIcons?.some(other => other.user._id === user._id) && setLikeIcons([...LikeIcons, initLike])
          setTotalLike(totalLike + 1)
          getLike && getLike([initLike], data._id)
          setLiked(initLike);
          likePost(data._id, initLike,"comment"
        )
      }

      handleFilteIcon()

    }

    const handleGetReact = (dataReact) => {
      setLiked(dataReact)
      setShowLike(false) 
      getLike && getLike([dataReact], data._id)

      Object.keys(Liked).length === 0 && setTotalLike(totalLike + 1)
      
      const index = LikeIcons?.findIndex(obj => obj?.user?._id === user?._id);
      if (index === -1) {
        setLikeIcons([...LikeIcons, dataReact])
      } else {
        LikeIcons[index] = dataReact
        setLikeIcons([...LikeIcons])
      }
      
      handleFilteIcon()
    }

    const handleFilteIcon = () => {
      LikeIcons.length > 1 && setLikeIcons(LikeIcons?.filter((obj, index, self) =>
          index === self?.findIndex((t) => (
               t?.reactName === obj?.reactName
            )
          )
        )
      )
    }

   const handerShowInput = (idComment, username) => {
    handlerCommenting(idComment, username)
   }

   const handleViewImage = (idPhoto) => {
     navigate(`/detail_photos_comment/${idPhoto}`)
   }

  return (
    <>
    { data && 
        <div className={`w-full mb-2`}>
          <div className="flex w-full max-w-[90%] ">
              <div className="min-w-[35px] max-w-[35px] h-[35px] ">
                <img className="w-full h-full rounded-full relative" src={data?.author?.avatar} alt="anhdaidien"/>
              </div>
              <div>
                  <div className=" min-w-[100px] ml-2 comment-bg bg-gray-200 px-4 pt-1 pb-3 rounded-xl relative">
                      <h3 className="font-bold hover:underline cursor-pointer text-sm primary-text">{data?.author?.username}</h3>
                      <h3 className="text-[15px] leading-5 primary-text">{data?.content}</h3>
                      {
                        LikeIcons?.length !== 0 && !data?.image && <div className="absolute flex bottom-[-5px] right-[-5px]">
                          {
                            LikeIcons?.map((other, index) => (
                              <img className={`translate-x-[${ (10 * (index + 1) + 5)}px] ${LikeIcons?.length !== 1 ? 'mr-2' :  'mr-[20px]'}`} key={index} width="20" height="20" src={other.reactUrl} alt={other.reactName}/>
                            ))
                          }
                          {totalLike > 1 && <span className={`opacity-70 dark:text-white text-black`}>{totalLike}</span>}
                        </div>
                      }
                  </div>
                   {
                     data?.image &&
                     <div className="w-[170px] my-2 ml-2 relative">
                        <img onClick={ e => handleViewImage(data._id) } className="cursor-pointer h-full rounded-xl b-full " src={data?.image} alt="anhcomment"/>
                        {
                        LikeIcons?.length !== 0 && <div className="absolute flex bottom-[-5px] right-[-5px] ">
                          {
                            LikeIcons?.map((other, index) => (
                              <img className={`translate-x-[${ (10 * (index + 1) + 5)}px] ${LikeIcons?.length !== 1 ? 'mr-2' :  'mr-[20px]'}`}  key={index} width="20" height="20" src={other.reactUrl} alt={other.reactName}/>
                            ))
                          }
                          {totalLike > 1 && <span className="opacity-70 dark:text-white text-black">{totalLike}</span>}
                        </div>
                      }
                     </div>
                   }
                  
                  <div className="ml-5 flex relative mt-2">               
                    <div 
                      onMouseEnter={handleShowForm}
                      onMouseLeave={handleHideForm}
                      onClick={handlerLiked} 
                      ref={likeBtnRef} 
                      className="pr-4 text-xs primary-text hover:underline cursor-pointer">
                      {Object.keys(Liked).length !== 0 ? <span style={{'color': `${Liked.reactColor}`, 'fontWeight': 'bold'}}>{ Liked.reactName}</span> : <span>Like</span>}
                    </div>

                      {showLike && 
                        <div 
                            onMouseEnter={handleShowForm}
                            onMouseLeave={handleHideForm}
                           ref={FormLike} className="absolute bottom-[90%] pb-3 left-[-10px]">
                          <ReactsForm type="comment" dataReact={handleGetReact} id={data._id} user={user}/>
                        </div>
                      }
                    <div onClick={ e => {handerShowInput(data._id, data?.author?.username)}} className="pr-4 text-xs primary-text hover:underline cursor-pointer relative">Reply</div>
                    <div className="pr-4 text-xs primary-text hover:underline cursor-pointer relative">11m</div>
                  </div>
              </div>
          </div>
       </div>
    }

       </>
  )
}

export default memo(CommentLayout)