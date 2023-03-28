/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import IgnoreDynamic from "../navigation/ignore_dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const GroupList = () => {
  const [myGroups, setMyGroups] = useState([]);

  const { user, rooms, roomsWait } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/v1/groupPublic/getMyGroups/${user._id}`)
      .then((response) => {
        setMyGroups([...response.data.MyGroups]);
      });
  }, [rooms]);

    const handlerBeginChat = (e) => {
      if (!rooms.includes(e.target.closest(".Group").getAttribute("idgroup"))) {
        dispatch({
          type: "ADD_ROOM",
          payload: e.target.closest(".Group").getAttribute("idgroup"),
        });

        roomsWait.forEach((item) => {
          if (item._id === e.target.closest(".Group").getAttribute("idgroup")) {
            dispatch({
              type: "DELETE_ROOM_WAIT",
              payload: item,
            });
          }
        });
      }
    };

    const handlerCreate = () => {
      dispatch({
        type: "ON",
      });
    };

    return (
      <div className="w-full cursor-pointer pb-10">
        <hr className="mb-2 border b-full" />
        <div className="text-center mb-2 font-medium text-md uppercase dark:text-white">
          My Groups
        </div>
        <IgnoreDynamic
          svg={<FontAwesomeIcon icon={faCirclePlus}/>}
          text="Create new group"
          onClick={handlerCreate}
          className="text-3xl w-[50px] h-[50px] flex items-center justify-center border-2 border-black dark:border-white text-gray-900 dark:text-white rounded-full ps-2"
        />
        {myGroups.map((group, index) => (
          <IgnoreDynamic
            key={index}
            image={group.avatar}
            text={group.name}
            idGroup={group._id}
            onClick={handlerBeginChat}
          />
        ))}
      </div>
    );
};

export default GroupList;
