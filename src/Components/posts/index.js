/* eslint-disable react-hooks/exhaustive-deps */
import {
  faComment,
  faEarth,
  faHeart,
  faShare,
  faThumbsUp,
  faUserFriends,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import Moment from "../moments";
import LoadingChatBox from "../loadings/LoadingChatBox";

import styles from "./post.module.scss";
import ShowImagesPost from "./ShowImagesPost";
import CommentPost from "../comment";
import { useEffect, useState, useRef } from "react";
import InputComment from "../comment/inputComment";

const cx = classNames.bind(styles);
const Post = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);


  const containerRef = useRef(null)
  const postRef = useRef(null)
  const photosRef = useRef(null)
  const userRef = useRef(null)

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
  })

  return (
    <div
      ref={containerRef}
      className={` ${
        showDetail &&
        "fixed inset-0 z-50 dark:bg-black bg-white bg-opacity-20 dark:bg-opacity-70 flex-center"
      }`}
    >
      <div
        ref={postRef}
        className={cx(
          `${
            showDetail
              ? "w-[755px] h-full lg:h-[100%] overflow-y-scroll custom_scroll mb-0 relative"
              : "mb-2"
          } w-[full] max-md:rounded-none bg-white shadow-md rounded-xl secondary-bg border b-full dark:shadow-gray-900 shadow-md shadow-gray-400`
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
            <span className={cx("font-medium")}>{data.author.username}</span>
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
            <ShowImagesPost idPost={data._id} />
          </div>
        )}
        <hr className={cx("dark:border-black")} />
        <div className={cx("px-5 pb-4")}>
          <div className={cx("flex justify-between py-5")}>
            <div>
              <span>10k </span>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div
              onClick={handleShowDetailPost}
              className={cx("hover:underline cursor-pointer")}
            >
              {" "}
             1.7k comments
            </div>
          </div>
          <hr className={cx("b-full")} />
          <div className={cx("py-1 grid grid-cols-12 gap-2")}>
            <div
              className={cx(
                "col-span-4 flex items-center justify-center font-medium hover-dark hover:bg-gray-200 py-3 rounded-lg cursor-pointer"
              )}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className={cx("ml-2")}>Like</span>
            </div>
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
              <CommentPost post={data._id} />
            </div>
            <div className="sticky bottom-0 secondary-bg bg-white">
              <InputComment post={data._id} parent_id={data._id} level="1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
