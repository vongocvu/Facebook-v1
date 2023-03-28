/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";


const socket = require("socket.io-client")(process.env.REACT_APP_API)



const InputComment = ({post, parent_id, level, isFocus}) => {


  const { user } = useSelector((state) => ({ ...state }));
  const [comment, setComment] = useState("");
  

  const inputRef = useRef(null);
  const iconRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.scrollIntoView({ behavior: "smooth" , block: "end", inline: "nearest" })
    setComment(isFocus !== "" ? `${isFocus ? isFocus : ""} ` : "")
    inputRef?.current?.focus()
  },[isFocus])


  const handlerSubmitComment = async () => {
    
    await axios.post(`${process.env.REACT_APP_API}/v1/comment/addComment`, {
            author: user._id,
            content: comment,
            post: post,
            parent_id: parent_id,
            level: level
        })
        .then(response => {
          socket.emit("newComment", {
            author: user,
            content: comment,
            post: post,
            parent_id: parent_id,
            level: level,
            _id: response.data._id
          })

          setComment("")
          formRef.current.reset()
        })
  }

  return (
    <div className="flex py-3 items justify-center w-full">
      <div className="min-w-[35px] max-w-[35px] h-[35px] mr-3 mt-2">
        <img
          className="w-full h-full rounded-full"
          src={user.avatar}
          alt="anhdaidien"
        />
      </div>

    <form ref={formRef} className="w-full">
      <div className="flex flex-wrap items-center w-full comment-bg bg-gray-200 min-h-[40px] px-3 py-2 rounded-3xl overflow-hidden">
          <TextareaAutosize
            ref={inputRef}
            value={comment}
            onKeyDown={ e => e.keyCode === 13 && handlerSubmitComment()}
            onChange={(e) => setComment(e.target.value)}
            className={`comment-bg px-2 h-full outline-none bg-gray-200 primary-text custom_scroll resize-none ${comment?.length > 15 ? 'w-[100%]' : 'w-[60%]'}`}
            placeholder="Write a comment..."
            minRows={1}
            maxRows={10}
          />

        <div ref={iconRef} className={`flex  ${comment?.length > 15 ? 'w-[100%] justify-end' : 'w-[40%] justify-end'}`}>
          <div className={`${comment?.length > 15 ? 'w-[40%] flex justify-end' : 'w-full flex justify-end'}`}>
            <div className="w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full">
                <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -396px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
            </div>
            <div className="w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full">
                <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -515px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
            </div>
            <div className="w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full">
                <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -430px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
            </div>
            <div className="w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full">
                <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -566px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
            </div>
            <div className="w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full">
                <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -685px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
            </div>
          </div>
        </div>
      </div>
        </form>
    </div>
  );
};

export default InputComment;
