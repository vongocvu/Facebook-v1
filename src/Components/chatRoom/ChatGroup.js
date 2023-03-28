/* eslint-disable react-hooks/exhaustive-deps */
import {
  faChevronDown,
  faCirclePlus,
  faGift,
  faImage,
  faMinus,
  faNoteSticky,
  faThumbsUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import io from "socket.io-client";
import axios from "axios";

import styles from "./chatRoom.module.scss";
import handlerChat from "../functions/handlerChat";
import LoadingChatBox from "../loadings/LoadingChatBox";
import FirstChat from "./message/firstChat";
import SettingsChatBox from "./forms/settingOnChatBox";
import ShowTabName from "../tooltip";
import HandlerShowMessage from "./message/handlerShowMessage";


const socket = io(process.env.REACT_APP_API);
const cx = classNames.bind(styles);

const ChatGroup = ({ data, chatWindow, roomChating }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { rooms, roomsWait, usersOnline } = useSelector((state) => ({
    ...state,
  }));

  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  const [ inputChat, setInputChat ] = useState("");
  const [ ChatList, setChatList ] = useState([]);

  const [ hidden, setHidden ] = useState(false);
  const [ getData, setGetData ] = useState(true);
  const [ loading, setLoading ] = useState(true);
  const [ formOptions, setFormOptions ] = useState(false);
  const [ newMessage, setNewMessage ] = useState([])
  const [ IsChatting, setIsChatting ] = useState(false)



  useEffect(() => {
    messageListRef?.current && messageListRef?.current.scrollIntoView();
    socket.on("message", (message) => {
      if (message.group === data._id) {

        message.sender._id !== user._id && setIsChatting(true)

        dispatch({
          type: "ADD_ROOM",
          payload: message.group,
        });
        !chatWindow && setHidden(true);
        setNewMessage([...newMessage, message]);
      } 
    });
  }, [newMessage]);


  useEffect(() => {
    messageListRef?.current?.scrollIntoView()
  })

  useEffect(() => {
    if (hidden && getData) {
      const getMessages = async () => {
        await axios
          .get(`${process.env.REACT_APP_API}/v1/message/getByGroup/${data._id}`)
          .then((response) => {
            setChatList([...response.data.messages]);
            setTimeout(() => {
              messageListRef.current?.scrollIntoView();
            }, 500);
            setLoading(false);
          });
      };
      setGetData(false);
      getMessages();
    }
  }, [hidden]);

  const handlerSendMessage = (e) => {
    if (inputChat.length > 0) {
      handlerChat.senderMessage({
        sender: {
          _id: user._id,
          avatar: user.avatar,
          username: user.username,
        },
        group: data._id,
        content: inputChat,
      });
      setInputChat("");
      e.target.focus();
    }
  };

  useEffect(() => {
    if (rooms.length > 3) {
      if (data._id === rooms[0]) {
        dispatch({
          type: "DELETE_ROOM",
          payload: rooms[0],
        });

        dispatch({
          type: "ADD_ROOM_WAIT",
          payload: { _id: data._id, avatar: data.avatar },
        });
      }
    }
  }, [rooms]);

  useEffect(() => {
    !chatWindow && rooms.includes(data._id) && setHidden(true);
    !chatWindow && !rooms.includes(data._id) && setHidden(false);
  }, [rooms]);

  useEffect(() => {
    chatWindow && inputRef?.current?.focus();
  });
  
  useEffect(() => {
    chatWindow && setHidden(false);
    data._id === roomChating && setHidden(true);
  }, [roomChating]);

  const handlerDeleteChatBox = () => {
    roomsWait.length > 0 &&
      dispatch({
        type: "ADD_ROOM",
        payload: roomsWait.pop()._id,
      });

    dispatch({
      type: "DELETE_ROOM",
      payload: data._id,
    });

    setHidden(false);
  };

  const handlerWaitChatBox = () => {
    dispatch({
      type: "ADD_ROOM_WAIT",
      payload: data,
    });

    dispatch({
      type: "DELETE_ROOM",
      payload: data._id,
    });

    setHidden(false);
  };

  const handlerOption = (e) => {
    setFormOptions(!formOptions);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !document.getElementById(`btnShowOption${data._id}`)?.contains(e.target)
      ) {
        setFormOptions(false);
      }
    });
  }, [data._id]);

  const gotoProfile = () => {
    "notthing !";
  };

  const handlerSended = () => {
    setIsChatting(false)
  }

  return (
    hidden && (
      <div
      onClick={handlerSended} 
        id={data._id}
        tabIndex="0"
        oldtheme={data.theme}
        className={cx(
          `${
            chatWindow
              ? "w-full h-full active"
              : "w-[350px] h-[500px] rounded-t-lg shadow-2xl ml-2"
          } `,
          "flex flex-col bg-white border secondary-bg dark:text-white b-full dark:shadow-black relative",
          "ChatBox"
        )}
      >
        {formOptions && (
          <SettingsChatBox
            show={formOptions}
            idGroup={data._id}
            type="groupPublic"
          />
        )}
         <div className={cx(`w-full px-1 ${chatWindow ? 'h-[65px] border-b b-bottom' : `h-[50px]  ${IsChatting ? 'bg-blue-500' : 'secondary-bg bg-white'}`} rounded-t-lg flex items-center justify-between p-1  b-bottom`,'actived')}>
          <div
            className={cx(
              `h-full flex items-center ${
                !chatWindow &&
                "dark:hover:bg-gray-800 hover:bg-gray-200 hover-dark"
              } cursor-pointer pl-2 pr-4 rounded-lg`
            )}
          >
            <img
              className={cx(
                "h-[36px] w-[36px] rounded-full mr-2",
                `${usersOnline.some(
                  (userOnline) =>
                    userOnline._id === data._id && "border-[2px] border-white"
                )}`
              )}
              src={data.avatar}
              alt=""
            />
            <ShowTabName tabName={`${!chatWindow ? "Setting" : data.name}`}>
              <div
                id={`btnShowOption${data._id}`}
                onMouseDown={!chatWindow ? handlerOption : gotoProfile}
                className={cx("")}
              >
                <h4 className={cx("font-medium leading-3 text-sm")}>
                  {data.name}
                </h4>
                <span className={cx("text-sm leading-3 font-thin ")}>
                  Online 10 minutes ago
                </span>
              </div>
            </ShowTabName>
            <FontAwesomeIcon
              className="ml-3 text-sm font-thin focusChatBox"
              icon={faChevronDown}
            />
          </div>
          {!chatWindow && (
            <div className="flex w-[50px] justify-between mr-3 text-xl text-gray-300 dark:text-gray-400">
              <div
                onClick={handlerWaitChatBox}
                className="cursor-pointer focusChatBox hover:translate-y-[-3px]"
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
              <div
                onClick={handlerDeleteChatBox}
                className="cursor-pointer focusChatBox hover:translate-y-[-3px]"
              >
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          )}
        </div>

        <div
          className={cx(
            "flex-1 overflow-y-scroll text-sm pb-[5px] custom_scroll"
          )}
        >
          {loading && <LoadingChatBox />}
          <FirstChat avatar={data.avatar} />

          <HandlerShowMessage chatList={ChatList} user={user} data={data}/>
          <HandlerShowMessage chatList={newMessage} user={user} data={data}/>

          <div ref={messageListRef}></div>
        </div>
        <div
          className={cx(
            "h-[60px] flex items-center px-3 py-2 text-gray-300 dark:text-gray-400"
          )}
        >
          <div className={cx("flex flex-nowrap text-xl")}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={cx("mr-2 cursor-pointer focusChatBox")}
            />
            <FontAwesomeIcon
              icon={faImage}
              className={cx("mr-2 cursor-pointer focusChatBox")}
            />
            <FontAwesomeIcon
              icon={faNoteSticky}
              className={cx("mr-2 cursor-pointer focusChatBox")}
            />
            <FontAwesomeIcon
              icon={faGift}
              className={cx("mr-2 cursor-pointer focusChatBox")}
            />
          </div>
          <input
            ref={inputRef}
            value={inputChat}
            onChange={(e) => setInputChat(e.target.value)}
            onKeyDown={(e) => e.keyCode === 13 && handlerSendMessage(e)}
            className={cx(
              "h-full w-full mb-1 rounded-3xl text-black dark:text-white px-2 pl-4 outline-0 comment-bg dark:border-black"
            )}
            type="text"
            placeholder="Aa"
          />
          <div>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={cx("ml-2 cursor-pointer focusChatBox text-xl")}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ChatGroup;
