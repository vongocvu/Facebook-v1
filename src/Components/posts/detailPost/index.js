/* eslint-disable react-hooks/exhaustive-deps */
import {
  faChevronLeft,
  faChevronRight,
  faComment,
  faEarth,
  faShare,
  faUserFriends,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Moment from "../../moments";
import CommentPost from "../../comment";
import InputComment from "../../comment/inputComment";
import LoadingChatBox from "../../loadings/LoadingChatBox";
import { likePost, cancelLikePost } from "../../functions/likePost";
import ReactsForm from "../../forms/likeForm"

const socket = require("socket.io-client")(process.env.REACT_APP_API)

const DetailPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { roomsWait, user } = useSelector((state) => ({ ...state }));
  const [ Post, setPost ] = useState();
  const [ GroupPost, setGroupPost ] = useState([]);
  const [ prevBtn, setPrevBtn ] = useState(false);
  const [ nextBtn, setNextBtn ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ Liked, setLiked ] = useState({})
  const [ showLike, setShowLike ] = useState(false);
  const [ totalLike, setTotalLike ] = useState()
  const [ LikeIcons, setLikeIcons ] = useState([])
  const [ totalComments, setTotalComments ] = useState()
  const [ ParentPost, setParentPost ] = useState({})

  const FormLike = useRef(null)
  const likeBtnRef = useRef(null)

  const initLike = {
    user: user, 
    reactName: 'Like', 
    reactUrl: "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png", 
    reactColor: 'rgb(32, 120, 244)'
  }

  useEffect(() => {
    socket.on('comment', comment => {
      if (comment.post === Post?._id || comment.post === GroupPost[0]?.parent_post) {
          setTotalComments(totalComments + 1)
        }
    })
  },[totalComments])

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_API}/v1/postDetail/getOne/${id}`)
        .then((response) => {
          setGroupPost(response.data.groupPost);
          setPost(response.data.curent_post);
          setLoading(false);
          setTotalLike(response.data.curent_post.reacts.length);
          response.data.curent_post.reacts.forEach((react) => {
            react?.user._id === user._id && setLiked(react)
          })
          response.data.curent_post.reacts.length > 0 && setLikeIcons(response.data.curent_post.reacts?.filter((obj, index, self) =>
              index === self.findIndex((t) => (
                t?.reactName === obj?.reactName
              ))
            )
          )
          setTotalComments(response.data.curent_post.countComments)

            if (response.data?.groupPost?.length === 1) {
              setParentPost({ _id: response.data?.groupPost[0]?.parent_post})
            }
        });
    };
    getPost();
  }, [id]);

  useEffect(() => {
    GroupPost.forEach((post, index) => {
      if (post?._id === id) {
        index === 0 ? setPrevBtn(false) : setPrevBtn(true);
        index === GroupPost.length - 1 ? setNextBtn(false) : setNextBtn(true);
      }
    });
  },[GroupPost]);

  const handlerNextPost = () => {
    setTotalLike(0)
    setLiked({})
    GroupPost.forEach((post, index) => {
      if (post?._id === id) {
        navigate(`/post/detail/${GroupPost[index + 1]?._id}`);
      }
    });
  };

  const handlerPrevPost = () => {
    setTotalLike(0)
    setLiked({})
    GroupPost.forEach((post, index) => {
      if (post?._id === id) {
        navigate(`/post/detail/${GroupPost[index - 1]?._id}`);
      }
    });
  };

  const handlerCancel = () => {
    navigate("/");
  };

  const showLikeForm = () => {
    setShowLike(true)
}

const hideLikeForm = () => {
  setShowLike(false)
}

const handleLikePost = () => {

  if (Object.keys(Liked).length !== 0) {
    setLiked({})
    cancelLikePost(Post._id, user._id, "postdetail")
    setTotalLike(totalLike - 1)
    Liked?.length === 0 && setLikeIcons([])
    setLikeIcons(LikeIcons?.filter(like => like.user._id !== user._id))
  }

  if (Object.keys(Liked).length === 0) {
    setTotalLike(totalLike + 1)
    setLikeIcons([...LikeIcons, initLike])
    setLiked(initLike);
    likePost(Post._id, initLike,"postdetail")
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
    <div className="fixed inset-0 z-10 mt-[60px]">
      <div className="w-full h-full overflow-y-scroll custom_scroll relative">
        <div className="flex-wrap flex sm:flex-wrap md:flex-wrap h-body">
          <div className="w-full h-auto lg:h-full sm:w-[100%] md:w-[100%] lg:flex-1 bg-white dark:bg-black relative flex-center">
            <div
              onClick={handlerCancel}
              className="absolute dark:text-white text-2xl top-[15px] left-[30px] w-[40px] h-[40px] rounded-full hover-dark flex-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            {prevBtn && (
              <div
                onClick={handlerPrevPost}
                className="w-[60px] h-[60px] cart-bg flex-center cursor-pointer cart-hover rounded-full absolute text-white top-2/4 left-[40px] text-3xl"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            )}
            {nextBtn && (
              <div
                onClick={handlerNextPost}
                className="w-[60px] h-[60px] cart-bg flex-center cursor-pointer cart-hover rounded-full absolute text-white top-2/4 right-[40px] text-3xl"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            )}
            <div className="w-full h-auto lg:w-[85%] lg:h-[100%]">
              <img
                className="w-full h-full object-contain"
                src={Post?.image}
                alt="anh"
              />
            </div>
          </div>

          <div className="w-full flex flex-col sm:h-auto md:h-auto lg:h-[100%] sm:w-[100%] md:w-[100%] lg:w-[450px] bg-gray-100 secondary-bg p-3 pb-0 relative lg:overflow-y-scroll custom_scroll">
            <div className="flex primary-text items-center ">
              <img
                className="w-10 h-10 rounded-full mr-[10px]"
                src={Post?.parent_post.author.avatar}
                alt="anh"
              />
              <div className="flex flex-col justify-center">
                <span className="font-medium text-lg leading-[25px]">
                  {Post?.parent_post.author.username}
                </span>
                <span className="text-xs">
                  {Moment(Post?.parent_post.createdAt)} -{" "}
                  {Post?.parent_post.status_share === 1 ? (
                    <FontAwesomeIcon icon={faEarth} />
                  ) : (
                    <FontAwesomeIcon icon={faUserFriends} />
                  )}
                </span>
              </div>
            </div>
            <div className="my-4 primary-text">{Post?.content}</div>
            <div></div>

            <div className="grid grid-cols-12 gap-2 b-top b-bottom mt-5 border-t-2 border-b-2 boder-gray-900 secondary-text mb-4">
        <div className="col-span-12">
          <div className="flex justify-between py-5">
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
              <span className="primary-text ml-3">{totalLike === 1 && LikeIcons[0]?.user?.username } { totalLike > 1 && `${LikeIcons[0]?.user?.username} and ${LikeIcons?.length - 1} others`} </span>
            </div>
            <div
              className="hover:underline cursor-pointer"
            >
              {totalComments} comments
            </div>
          </div>
          <div className="py-1 grid grid-cols-12 gap-2 relative b-bottom b-top border-t border-b border-gray-100"
          >
            <div
              onClick={handleLikePost}
              onMouseEnter={showLikeForm}
              onMouseLeave={hideLikeForm}
              ref={likeBtnRef}
              style={{'color': `${Object.keys(Liked).length !== 0 ? Liked?.reactColor : ""}`}}
              className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
            >
            {
              <img className="w-[25px]" src={Object.keys(Liked).length !== 0 ? Liked?.reactUrl : "https://res.cloudinary.com/dliwmidhl/image/upload/v1680699903/download_1_bufrca.png"} alt={Liked?.reactName} />
            }
              <span className="ml-2">{ Object.keys(Liked).length !== 0 ? Liked?.reactName : "Like"}</span>
            </div>


            {showLike && 
              <div 
              onMouseEnter={showLikeForm}
              onMouseLeave={hideLikeForm}
              className="absolute bottom-[80%] flex left-[-5px] pb-4  cursor-pointer" ref={FormLike}>
                <ReactsForm type="postdetail" dataReact={handleGetReact} id={Post._id} user={user}/>
              </div> } 


            <div
              className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
            >
              <FontAwesomeIcon icon={faComment} />
              <span className="ml-2">Comment</span>
            </div>
            <div
              className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
            >
              <FontAwesomeIcon icon={faShare} />
              <span className="ml-2">Share</span>
            </div>
          </div>
        </div>
            </div>


            <div className="flex-1 pb-[80px] md:pb-[80px] lg:pb-0">
              {loading ? (
                <LoadingChatBox />
              ) : GroupPost?.length === 1 ? (
                <CommentPost post={ParentPost} />
              ) : (
                <CommentPost post={Post} />
              )}
            </div>
            <div className="fixed md:fixed lg:absolute lg:sticky left-0 right-0 bottom-0 w-full flex justify-center primary-text secondary-bg">
              <InputComment
                post={GroupPost.length === 1 ? GroupPost[0]?.parent_post : id}
                level="1"
                parent_id={
                  GroupPost.length === 1 ? GroupPost[0]?.parent_post : id
                }
              />
            </div>
          </div>
         
          {roomsWait.length > 0 && 
             <div className="b-left w-[85px] border-l border-gray-200 bg-gray-100 secondary-bg">

             </div>      
          }
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
