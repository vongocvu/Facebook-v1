/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import ChatGroup from "../chatRoom/ChatGroup";
import ChatPrivate from "../chatRoom/ChatPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const ChatGlobal = ({ chatWindow, roomMessage }) => {
  const dispatch = useDispatch();

  const [ConversationList, setConversationList] = useState([]);
  const { rooms, user, roomsWait } = useSelector((states) => ({ ...states }));
  const [connected, setConnected] = useState(false);
  const [IsChatWindow, setIsChatWindow] = useState(false);

  useEffect(() => {
    chatWindow && setIsChatWindow(true)
  },[IsChatWindow])

  const ChatBox = document.querySelectorAll(".ChatBox");

  const handlerWaitChat = (roomWait) => {
    roomsWait?.forEach((item) => {
      if (item._id === rooms[rooms.length - 1]) {
        dispatch({
          type: "ADD_ROOM_WAIT",
          payload: item,
        });
      }
    });

    dispatch({
      type: "ADD_ROOM",
      payload: roomWait._id,
    });

    dispatch({
      type: "DELETE_ROOM_WAIT",
      payload: roomWait,
    });
  };

  ChatBox?.forEach((item) => {
    item.addEventListener("focus", () => {
      item.classList.add("active");
    });

    item.lastElementChild.children[1].addEventListener("focus", () => {
      ChatBox.forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      item.lastElementChild.children[1].style.flex = "1";
      item.lastElementChild.children[0].style.width = "25px";
    });

    item.lastElementChild.children[1].addEventListener("blur", () => {
      item.lastElementChild.children[0].style.width = "auto";
      item.classList.remove("active");
    });

    item.addEventListener("blur", () => {
      item.classList.remove("active");
    });
  });

  useEffect(() => {
    socket.on("createGroup", (data) => {
      setConnected(!connected);
    });
    const fetchData = async () => {
      try {
        const request1 = axios.get(
          `http://localhost:8000/v1/groupPublic/getMyGroups/${user?._id}`
        );
        const request2 = axios.get(
          `http://localhost:8000/v1/groupPrivate/getMyGroups/${user?._id}`
        );

        const [response1, response2] = await axios.all([request1, request2]);
        setConversationList([
          ...response1.data.MyGroups,
          ...response2.data.MyGroups,
        ]);
      } catch (error) {
        console.error(error);
      }
    };
    user && fetchData();
  }, [rooms, roomsWait, connected]);

  const handlerDeleteRoomWait = (roomWait) => {
    dispatch({
      type: "DELETE_ROOM_WAIT",
      payload: roomWait,
    });
  };

  useEffect(() => {
    rooms.includes(rooms[rooms.length - 1]) 
    && roomsWait.some(room => room._id === rooms[rooms.length - 1]) 
    && roomsWait.forEach(room => {
      room._id === rooms[rooms.length - 1] && dispatch({
        type: "DELETE_ROOM_WAIT",
        payload: room
      });
    })
  },[rooms])

  return (
    user && (
      <div className={`${IsChatWindow ? 'relative flex-1 ' : ' pr-[100px]'}  fixed right-0 bottom-0 flex justify-end `}>
        {!IsChatWindow &&<div className="w-[80px] flex flex-col pb-5 h-auto absolute bottom-0 right-0">
          {roomsWait?.map((roomWait, index) => (
                <div
                  key={index}
                  className="w-[50px] h-[50px] rounded-full mt-3 cursor-pointer relative box"
                >
                  <img
                    className="w-full h-full rounded-full"
                    src={roomWait.avatar}
                    alt="anh"
                    onClick={() => handlerWaitChat(roomWait)}
                  />

                  <FontAwesomeIcon
                    onClick={() => handlerDeleteRoomWait(roomWait)}
                    className="absolute text-md text-black bottom-[30px] right-[-5px] transition dark:hover:text-red-500 dark:text-white"
                    icon={faXmark}
                  />
                </div>
              ))}
            </div>
        } 
        <div className={`${IsChatWindow ? ' w-full ' : 'flex'}`}>
          {ConversationList?.map((room, index) =>
            room.typeGroup === 1 ? (
              <ChatPrivate chatWindow={IsChatWindow} roomChating={roomMessage} key={index} data={room} />
            ) : (
              <ChatGroup chatWindow={IsChatWindow} roomChating={roomMessage} key={index} data={room} />
            )
          )}
        </div>
      </div>
    )
  );
};

export default ChatGlobal;
