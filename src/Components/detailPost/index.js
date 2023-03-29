/* eslint-disable react-hooks/exhaustive-deps */
import {
  faChevronLeft,
  faChevronRight,
  faComment,
  faEarth,
  faShare,
  faThumbsUp,
  faUserFriends,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Moment from "../moments";
import CommentPost from "../comment";
import InputComment from "../comment/inputComment";
import LoadingChatBox from "../loadings/LoadingChatBox";


const DetailPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [Post, setPost] = useState();
  const [GroupPost, setGroupPost] = useState([]);
  const [prevBtn, setPrevBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [ loading, setLoading] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      setLoading(true)
      await axios
        .get(`${process.env.REACT_APP_API}/v1/postDetail/getOne/${id}`)
        .then((response) => {
          setGroupPost(response.data.groupPost);
          setPost(response.data.curent_post);
          setLoading(false)
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
  });

  const handlerNextPost = () => {
    GroupPost.forEach((post, index) => {
      if (post?._id === id) {
        navigate(`/post/detail/${GroupPost[index + 1]?._id}`);
      }
    });
  };

  const handlerPrevPost = () => {
    GroupPost.forEach((post, index) => {
      if (post?._id === id) {
        navigate(`/post/detail/${GroupPost[index - 1]?._id}`);
      }
    });
  };

  const handlerCancel = () => {
    navigate('/')
  };


  return (
    <div className="fixed inset-0 z-30 mt-[60px]">
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
        <div className="w-full flex flex-col sm:h-auto md:h-auto lg:h-[100%] sm:w-[100%] md:w-[100%] lg:w-[500px] bg-gray-100 secondary-bg p-3 pb-0 relative lg:overflow-y-scroll custom_scroll">
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
            <div className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-2 rounded-[2px] my-1 cursor-pointer">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className="ml-2">Like</span>
            </div>
            <div className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-2 rounded-[2px] my-1 cursor-pointer">
              <FontAwesomeIcon icon={faComment} />
              <span className="ml-2">Comment</span>
            </div>
            <div className="col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-2 rounded-[2px] my-1 cursor-pointer">
              <FontAwesomeIcon icon={faShare} />
              <span className="ml-2">Share</span>
            </div>
          </div>
          <div className="flex-1 pb-[80px] md:pb-[80px] lg:pb-0">
           {
                loading ?  <LoadingChatBox/> : GroupPost?.length === 1 ?  <CommentPost post={GroupPost[0]?.parent_post} /> : <CommentPost post={id} />
           } 
          </div>
          <div className="fixed md:fixed lg:absolute lg:sticky left-0 right-0 bottom-0 w-full b-top flex justify-center secondary-bg px-3 ">
             <InputComment post={ GroupPost.length === 1 ? GroupPost[0]?.parent_post : id} level="1" parent_id={GroupPost.length === 1 ? GroupPost[0]?.parent_post : id} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DetailPost;
