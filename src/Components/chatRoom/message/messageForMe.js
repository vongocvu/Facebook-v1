/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from "./styleMessage.module.scss";
import ShowTabName from "../../tooltip";
import Moment from "../../moments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ReactsForm from "../../forms/likeForm";
import { useSelector } from "react-redux";
import { memo } from "react";
const cx = classNames.bind(styles);

const MessageForMe = ({ message, theme, idGroup, realTimes, totalMessages }) => {

  const [ lastMessage, setLastMessage ] = useState(false)
  const [ lastImage, setLastImage ] = useState(false)
  const [ showOptions, hideOptions ] = useState(false)
  const [ showLike, setShowLike] = useState(false)
  const [ Liked, setLiked] = useState([])

   const { user } = useSelector(state => ({ ...state }))

   useEffect(() => {
    message?.reacts?.length > 0 && setLiked(message?.reacts)
   },[message._id])

  useEffect(() => {
    (totalMessages[totalMessages.length - 1].content === message.content && totalMessages[totalMessages.length] === undefined && message.image === "") 
    && setLastMessage(true)
    totalMessages[totalMessages.length - 1].content === message.content && totalMessages[totalMessages.length] === undefined && setLastImage(true)
  },[message, totalMessages])

  const times =
    realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt);


  const handleGetReact = (react) => {
      const index = Liked?.findIndex(like => like.user._id === react.user._id)   
      
      if (index !== -1) {
        Liked[index] = react
        setLiked([...Liked])
      } else {
        setLiked([...Liked, react])
      }
      setShowLike(false)
  }

  return (
    <>
      {message.content !== "" && (
        <div
              onMouseEnter={ e => hideOptions(true)}
              onMouseLeave={ e => hideOptions(false)}
              className="w-full min-h-10 flex mb-[1px] px-1 justify-end relative">
          <div
              className="flex items-center w-full flex-row-reverse ">

            <div className="flex items-center max-w-[70%] ">
              <ShowTabName tabName={times} position="top" theme="light">
                <div
                  className={cx(
                    "bg-black text-white px-3 py-2 my-[2px] rounded-r-xl rounded-l-2xl bg-blue-500 break-all relative",
                    `messagethemes${idGroup} ${Liked?.length > 0 && 'mb-5'}`
                  )}
                  style={{
                    backgroundImage: theme && theme,
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    position: "relative",
                    color: "white",
                  }}
                >
                  {message.content}

                  {
                    Liked?.length > 0 && 
                    <div className="absolute right-[2px] bottom-[-12px] flex flex-row-reverse">
                      {
                        Liked?.map((react, index) => (
                            <img key={index} className={`${index >= 1 && 'translate-x-[10px]'}`} width="20" height="20" src={react.reactUrl} alt={react.reactName} />
                          )
                        )
                      }
                    </div>
                    }
                </div>
              </ShowTabName>
              { lastMessage
              ?
                <div className="min-w-[25px] h-full flex justify-end text-center text-gray-500">
                   <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                : <div className="min-w-[25px]"></div>
              }
            </div>
            {
              showOptions &&
                <div 
                 onClick={ e => setShowLike(true)}
                className="mr-2">
                  <div className={`${Liked?.length > 0 && 'translate-y-[-8px]'} w-[30px] h-[30px] flex-center cursor-pointer cart-hover hover:bg-gray-300 rounded-full`}>
                    <i className="fiter-icon-dark" style={{'backgroundImage':'url(https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/I6wNWs7nQUG.png)', 'backgroundPosition': '7px -515px', 'backgroundSize': 'auto', 'width': '30px', 'height': '16px', 'backgroundRepeat': 'no-repeat', 'display': 'inline-block'}}></i>
                </div>
              </div>
            }
          </div>
              {showLike && 
                  <div 
                      onMouseEnter={ e => setShowLike(true)}
                      onMouseLeave={ e => setShowLike(false)}
                      className="absolute bottom-[80%] flex right-[40px] pb-4  cursor-pointer">
                         <ReactsForm  type="message" dataReact={handleGetReact} id={message._id} user={user} message={true}/>
                   </div> 
              } 
        </div>
      )}
      {message.image !== "" && (
        <div className="w-full flex flex-row-reverse my-[4px] px-1">
          { lastImage ?
            <div className="w-[25px] text-center text-gray-500 flex flex-col-reverse my-2">
               <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            : <div className="w-[25px]"></div>
          }
          <div className="max-w-[150px]">
            <img className="rounded-lg" src={message.image} alt="image_masage"/>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(MessageForMe);
