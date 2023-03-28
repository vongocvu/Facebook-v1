/* eslint-disable react-hooks/exhaustive-deps */
import TextareaAutosize from "react-textarea-autosize";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import {
  faEarth,
  faEllipsis,
  faSortDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ShowTabName from "../tooltip";
import AddImages from "../posts/postImages/addImages";
import PostAudience from "./PostAudience";
import Loading from "../loadings/LoadingChatBox";

const CreateNewPost = () => {
  const dispatch = useDispatch();

  const { user, formOn, verifyForm } = useSelector((state) => ({ ...state }));
  const [input, setInput] = useState("");
  const [addImage, setAddImage] = useState(false);
  const [DataImages, setDataImages] = useState([]);
  const [formShare, setFormShare] = useState(false);
  const [dataShare, setDataShare] = useState("1");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (input !== "" || DataImages.length > 0) {
      btnRef?.current?.classList.add("bg-blue-500");
      btnRef?.current?.classList.add("text-white");
      btnRef?.current?.classList.remove("comment-bg");
      btnRef?.current?.classList.remove("bg-gray-200");
      btnRef?.current?.classList.remove("cursor-not-allowed");
    } else if (input === "" || DataImages.length === 0) {
      btnRef?.current?.classList.remove("bg-blue-500");
      btnRef?.current?.classList.remove("text-white");
      btnRef?.current?.classList.add("bg-gray-200");
      btnRef?.current?.classList.add("comment-bg");
      btnRef?.current?.classList.add("cursor-not-allowed");
    }
  }, [input, DataImages]);

  const selectedImages = (images) => {
    setDataImages([...images]);
  };

  const handleHideForm = () => {
    dispatch({
      type: "ON-FORM-LEAVE",
    });
  };

  useEffect(() => {
    parentRef?.current?.addEventListener("click", (e) => {
      if (
        !childRef?.current?.contains(e.target) &&
        !document.getElementById("PostAudience")?.contains(e.target)
      ) {
        dispatch({
          type: "ON-FORM-LEAVE",
        });
      }
    });
  });

  useEffect(() => {
    verifyForm === "OK" && setFormShare(false);
    verifyForm === "OK" && setInput("");
    verifyForm === "OK" &&
      dispatch({
        type: "OFF-FORM",
      });
  }, [verifyForm]);

  const handlerShowFormShare = () => {
    childRef.current.style.display = "none";
    setFormShare(true);
  };

  const handlerInput = (e) => {
    setInput(e.target.value);
  };

  const handlerHideFormShare = (newDataShare) => {
    setFormShare(false);
    setDataShare(newDataShare);
    childRef.current.style.display = "block";
  };

  const handlerHideAddImage = () => {
    setAddImage(false);
    setDataImages([]);
  };

  const handlerShowAddImage = () => {
    setAddImage(true);
  };

  const submitPost = async () => {
    setInput("");
    if (input !== "" || DataImages.length > 0) {
      setLoading(true);

      await axios
        .post(`${process.env.REACT_APP_API}/v1/post/addPost`, {
          author: user._id,
          content: input,
          status_share: dataShare,
        })
        .then((response) => {
          
          DataImages.forEach(async (image) => {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("content", "1213");
            formData.append("parent_post", response.data._id);
            await axios.post(
              `${process.env.REACT_APP_API}/v1/postDetail/addPostDetail`,
              formData
            );
            dispatch({
              type: "OFF-FORM",
            });
            setLoading(false);
          });
        });
    }
  };

  return (
    formOn === "CreatePost" && (
      <div
        ref={parentRef}
        className="fixed top-0 w-full h-screen bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60 flex-center z-50"
      >
        {loading && <Loading />}
        <div
          ref={childRef}
          className="w-[500px] secondary-bg rounded-xl bg-white shadow-dark p-4 pt-0 shadow-md shadow-gray-400 overfow-hidden"
        >
          <div className="h-[65px] dark:text-white flex-center relative b-bottom border-b border-gray-300">
            <h4 className="font-bold text-xl">Create post</h4>
            <div
              onClick={handleHideForm}
              className="absolute primary-text w-[40px] h-[40px] flex-center right-[20px] hover-dark text-2xl primary-bg cursor-pointer rounded-full "
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>

          <div className=" py-2 flex dark:text-white items-center">
            <div className="w-[40px] h-[40px] mr-3 rounded-full overflow-hidden">
              <img
                className="w-full h-full"
                src={user?.avatar}
                alt="anhdaidien"
              />
            </div>
            <div className="">
              <h4 className="font-medium mb-">{user?.username}</h4>
              <button
                onClick={handlerShowFormShare}
                className="flex-center text-sm font-bold primary-text item-bg px-2 py-1 rounded-lg hover:opacity-80"
              >
                <FontAwesomeIcon className="mr-1" icon={faEarth} />{" "}
                {dataShare === "1" ? "Public" : "Friends"}{" "}
                <FontAwesomeIcon className="ml-1" icon={faSortDown} />
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col my-1 max-h-[500px]">
            <TextareaAutosize
              className="secondary-bg outline-none primary-text custom_scroll mb-2"
              ref={inputRef}
              value={input}
              onChange={handlerInput}
              placeholder={`What's your on mind, ${user?.username}?`}
              minRows={4}
              maxRows={10}
            />
            {addImage && (
              <AddImages
                selectedImages={selectedImages}
                hiddenAddImages={handlerHideAddImage}
              />
            )}
          </div>

          <div className=" h-[60px] flex items-center justify-between rounded-lg dark:text-white b-full b-top b-left b-right px-4 border dark:border-gray-900 border-gray-300">
            <span className="cursor-pointer">Add to your post</span>
            <div className="flex items-center">
              <ShowTabName tabName="Photo/video">
                <div
                  onClick={handlerShowAddImage}
                  className={`${
                    addImage && "comment-bg"
                  } w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full `}
                >
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/y7/r/Ivw7nhRtXyo.png"
                    alt="icon"
                  />
                </div>
              </ShowTabName>
              <ShowTabName tabName="Tag people">
                <div className="w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full ">
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png"
                    alt="icon"
                  />
                </div>
              </ShowTabName>
              <ShowTabName tabName="Feeling/activity">
                <div className="w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full ">
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png"
                    alt="icon"
                  />
                </div>
              </ShowTabName>
              <ShowTabName tabName="Check in">
                <div className="w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full ">
                  <img
                    className="w-[24px] h-[24px]"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png"
                    alt="icon"
                  />
                </div>
              </ShowTabName>
              <ShowTabName tabName="Life event">
                <div className="w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full ">
                  <img
                    className="w-[24px] h-[24px]"
                    src="	https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/pkbalDbTOVI.png"
                    alt="icon"
                  />
                </div>
              </ShowTabName>
              <ShowTabName tabName="More">
                <div className="w-[40px] h-[40px] primary-text flex-center hover-dark text-2xl dark-hover  cursor-pointer rounded-full ">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </ShowTabName>
            </div>
          </div>

          <div className="mt-4">
            <button
              ref={btnRef}
              onClick={submitPost}
              className="w-full h-[35px] rounded-lg comment-bg cursor-not-allowed hover:opacity-80 bg-gray-200"
            >
              Post
            </button>
          </div>
        </div>
        {formShare && (
          <PostAudience
            oldData={dataShare}
            hiddenFormShare={handlerHideFormShare}
          />
        )}
      </div>
    )
  );
};

export default CreateNewPost;
