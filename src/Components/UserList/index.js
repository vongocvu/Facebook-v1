/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";
import IgnoreDynamic from "../navigation/ignore_dynamic";

const UserList = (props) => {
  const dispatch = useDispatch();
  const { rooms, user } = useSelector((state) => ({ ...state }));
    const createRoomPrivate = async (friend) => {
      await axios
        .post(`${process.env.REACT_APP_API}/v1/groupPrivate/add`, {
          members: [
            {
               user: user._id,
               nickname: ""
            },
            {
               user: friend,
               nickname: ""
            }
          ],
        })
        .then((response) => {
          !rooms.includes(response.data.group._id) &&
            dispatch({
              type: "ADD_ROOM",
              payload: response.data.group._id,
            });
        });
    };

    const handlerChatPrivate = async (event) => {
      await axios
        .get(
          `${process.env.REACT_APP_API}/v1/groupPrivate/getMyGroup/${
            user._id
          }/${event.target.closest(".Friend").getAttribute("id")}`
        )
        .then((response) => {
          if (response.data.MyGroup && response.data.MyGroup.typeGroup === 1) {
            if (!rooms.includes(response.data.MyGroup._id)) {
              dispatch({
                type: "ADD_ROOM",
                payload: response.data.MyGroup._id,
              });
            }
          } else {
            createRoomPrivate(
              event.target.closest(".Friend").getAttribute("id")
            );
          }
        });
    };

    return (
      <div className="w-full mb-2">
        <div className="uppercase font-medium text-center my-2 dark:text-white">
        Users Is Online
        </div>
        {user &&
          props.usersOnline.map((friend, index) => (
            <IgnoreDynamic
              key={index}
              text={friend.username}
              id={friend._id}
              image={friend.avatar}
              onClick={handlerChatPrivate}
              online='true'
            />
          ))}
      </div>
    );
};


 const mapStateToProps = state => {
  return {
    usersOnline: state.usersOnline
  }
}

export default connect(mapStateToProps)(UserList);
