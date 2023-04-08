/* eslint-disable react-hooks/exhaustive-deps */
import {
  faComment,
  faEarth,
  faShare,
  faUserFriends,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef, memo } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import Moment from "../moments";
import LoadingChatBox from "../loadings/LoadingChatBox";

import styles from "./post.module.scss";
import ShowImagesPost from "./ShowImagesPost";
import CommentPost from "../comment";
import InputComment from "../comment/inputComment";
import { likePost, cancelLikePost } from "../functions/likePost";
import ReactsForm from "../forms/likeForm"

const socket = require("socket.io-client")(process.env.REACT_APP_API)

const cx = classNames.bind(styles);
const ContentPost = ({ data }) => {

  const { user } = useSelector(state => ({ ...state }))
  const [loading, setLoading] = useState(true);
  const [ showDetail, setShowDetail] = useState(false);
  const [ Liked, setLiked ] = useState({})
  const [ showLike, setShowLike ] = useState(false);
  const [ totalLike, setTotalLike ] = useState(data.reacts.length)
  const [ LikeIcons, setLikeIcons ] = useState([])
  const [ totalComments, setTotalComments ] = useState(data?.countComments)

  const containerRef = useRef(null)
  const postRef = useRef(null)
  const photosRef = useRef(null)
  const userRef = useRef(null)
  const likeBtnRef = useRef(null)
  const FormLike = useRef(null)

  const initLike = {
    user: user, 
    reactName: 'Like', 
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png", 
    reactColor: 'rgb(32, 120, 244)'
  }

  useEffect(() => {
    data && setLoading(false);
  }, [data]);

  const handleShowDetailPost = () => {
    setShowDetail(true);
  };

  const handlerHiddenDetailPost = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    data?.reacts?.forEach((react) => {
      react?.user._id === user._id && setLiked(react)
    })
  },[])

  useEffect(() => {
    socket.on('comment', comment => {
      if (comment.post === data?._id) {
        setTotalComments(totalComments + 1)
        }
    })
  },[totalComments])


  useEffect(() => {
     setLikeIcons(data?.reacts?.filter((obj, index, self) =>
        index === self.findIndex((t) => (
          t?.reactName === obj?.reactName
        ))
       )
     )
  },[])

  
  useEffect(() => {
    containerRef?.current?.addEventListener('click', (e) => {
      if (!postRef?.current?.contains(e.target)) {
        setShowDetail(false);
      }
    })
    photosRef?.current?.addEventListener('click', (e) => {
      setShowDetail(false);
    })

    userRef?.current?.addEventListener('click', (e) => {
      setShowDetail(false);
    })

  },[])

  const showLikeForm = () => {
      setShowLike(true)
  }

  const hideLikeForm = () => {
    setShowLike(false)
  }
       
  const handleLikePost = () => {

    if (Object.keys(Liked).length !== 0) {
      setLiked({})
      cancelLikePost(data._id, user._id, "post")
      setTotalLike(totalLike - 1)
      Liked?.length === 0 && setLikeIcons([])
      setLikeIcons(LikeIcons?.filter(like => like.user._id !== user._id))
    }

    if (Object.keys(Liked).length === 0) {
      setTotalLike(totalLike + 1)
      setLikeIcons([...LikeIcons, initLike])
      setLiked(initLike);
      likePost(data._id, initLike,"post")
      LikeIcons?.length > 1 && setLikeIcons(LikeIcons?.filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.reactName === obj.reactName
          ))
        )
      )}
  }

  const handleGetReact = (dataReact) => {
    setLiked(dataReact);
      Object.keys(Liked).length === 0 && setTotalLike(totalLike + 1)
      setShowLike(false)
      
      const index = LikeIcons?.findIndex(obj => obj.user._id === user._id);

            if (index === -1) {
            setLikeIcons([...LikeIcons, dataReact])
          } else {
            LikeIcons[index] = dataReact
            setLikeIcons([...LikeIcons])
          }

          LikeIcons?.length > 1 && setLikeIcons(LikeIcons?.filter((obj, index, self) =>
          index === self.findIndex((t) => (
            t.reactName === obj.reactName
          ))
        )
      )
    }
    
  return (
    <div
      ref={containerRef}
      className={` ${
        showDetail &&
        "fixed inset-0 z-[53] dark:bg-black bg-white bg-opacity-20 dark:bg-opacity-70 flex-center"
      }`}
    >
      <div
        ref={postRef}
        className={cx(
          `${
            showDetail
              ? "w-[755px] max-h-full lg:max-h-[97%] overflow-y-scroll custom_scroll mb-0 relative"
              : "mb-5"
          } w-[full] max-md:rounded-none bg-white b-full rounded-xl secondary-bg`
        )}
      >
            {loading && <LoadingChatBox />}

        {showDetail && (
          <div className="w-full h-[60px] b-bottom flex-center sticky top-0 left-0 right-0 secondary-bg border-b bg-white relative z-50">
            <div
              onClick={handlerHiddenDetailPost}
              className="absolute dark:text-white text-3xl right-[30px] w-[40px] h-[40px] rounded-full hover-dark flex-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h4 className="text-2xl font-medium">
              {data.author.username} Post's
            </h4>
          </div>
        )}
        <div ref={userRef} className={cx("flex py-[10px] px-[15px]")}>
          <img
            className={cx("w-10 h-10 rounded-full mr-[10px]")}
            src={data.author.avatar}
            alt="anh"
          />
          <div className={cx("flex flex-col")}>
            <div className="font-medium mb-1 flex flex-wrap">{data.author.username} 
              
              {
                data?.feeling && Object.keys(data?.feeling)?.length && (
                  <span className="ml-1 flex flex-wrap">
                    is <img className="w-[25px] h-[25px] mx-2" src={data?.feeling?.icon} alt="feeling"/>
                    feeling <span className="ml-1">{data?.feeling?.name}</span>
                  </span>
                )
              }

               {
                data?.tags?.length === 1 
                ? data?.tags?.map((tag, i) => (
                  (<div key={i} className="ml-1 flex">
                   <span className="opacity-70 font-thin">with</span>
                   <div className="mx-1">{tag?.username}</div>
                </div> )
                ))
                : data?.tags?.length > 1 && (<div className="ml-1 flex">
                   <span className="opacity-70 font-thin">with</span>
                   <div className="mx-1">{data?.tags[0]?.username}</div>
                   <span className="opacity-70 font-thin">and</span>
                   <div className="mx-1">{data?.tags?.length} others</div>
                </div> )
              }</div>
            <span className={cx("text-xs")}>
              {Moment(data.createdAt)} -{" "}
              {data.share === 1 ? (
                <FontAwesomeIcon icon={faEarth} />
              ) : (
                <FontAwesomeIcon icon={faUserFriends} />
              )}
            </span>
          </div>
        </div>
        <div className={cx("p-3")}>{data.content}</div>
        <hr className={cx("dark:border-black")} />
        {data && (
          <div ref={photosRef} className={cx("w-full")}>
            <ShowImagesPost  idPost={data._id} />
          </div>
        )}
        <hr className={cx("dark:border-black")} />
        
        <div className={cx("px-5 pb-4")}>
          <div className={cx("flex justify-between py-5")}>
            <div className="flex items-center">
              <div className="flex">
              {
                 totalLike > 0 && LikeIcons?.map((other, index) => (
                  <img className={`translate-x-[${(index + 5)}px]`} key={index} width="20" height="20" src={other.reactUrl} alt={other.reactName}/>
                ))
              }
              {
                totalLike === 0 &&
                <span>Let's the first like !</span>
              }
              </div>
              <span className="primary-text ml-3">{totalLike <= 1 ? LikeIcons[0]?.user?.username : `${LikeIcons[0]?.user?.username} and ${LikeIcons?.length - 1} others`} </span>
            </div>
            <div
              onClick={handleShowDetailPost}
              className={cx("hover:underline cursor-pointer")}
            >
              {totalComments} comments
            </div>
          </div>
          <div className={cx("py-1 grid grid-cols-12 gap-2 relative b-bottom b-top border-t border-b border-gray-100")}>
            <div
              onClick={handleLikePost}
              onMouseEnter={showLikeForm}
              onMouseLeave={hideLikeForm}
              ref={likeBtnRef}
              style={{'color': `${Object.keys(Liked).length !== 0 ? Liked?.reactColor : ""}`}}
              className={cx(
                "col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
              )}
            >
            {
              <img className="w-[25px]" src={Object.keys(Liked).length !== 0 ? Liked?.reactUrl : "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png"} alt={Liked?.reactName} />
            }
              <span className={cx("ml-2")}>{ Object.keys(Liked).length !== 0 ? Liked?.reactName : "Like"}</span>
            </div>


            {showLike && 
              <div 
              onMouseEnter={showLikeForm}
              onMouseLeave={hideLikeForm}
              className="absolute bottom-[80%] flex left-[-5px] pb-4  cursor-pointer" ref={FormLike}>
                <ReactsForm type="post" dataReact={handleGetReact} id={data._id} user={user}/>
              </div> } 


            <div
              onClick={handleShowDetailPost}
              className={cx(
                "col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
              )}
            >
              <FontAwesomeIcon icon={faComment} />
              <span className={cx("ml-2")}>Comment</span>
            </div>
            <div
              className={cx(
                "col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
              )}
            >
              <FontAwesomeIcon icon={faShare} />
              <span className={cx("ml-2")}>Share</span>
            </div>
          </div>
        </div>
        {showDetail && (
          <div className="flex flex-col justify-between px-3">
            <div className="flex-1">
              <CommentPost post={data} />
            </div>
            <div className="sticky absolute bottom-0 left-0 right-0 secondary-bg bg-white px-3">
              <InputComment post={data._id} parent_id={data._id} level="1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ContentPost);