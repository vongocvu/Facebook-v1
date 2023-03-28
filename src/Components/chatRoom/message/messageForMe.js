import classNames from "classnames/bind";

import styles from './styleMessage.module.scss'
import ShowTabName from '../../tooltip'
import Moment from '../../moments'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

const MessageForMe = ({ message, theme, idGroup, realTimes }) => {
    
  const times = realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)
  return (
       
      <div className="w-full h-10 flex mb-[1px] px-1 justify-end">
        <div className = "flex items-center max-w-[80%] flex-row-reverse">
          <div className = "flex items-center">
            <ShowTabName tabName={times}  position = 'right' theme="light">
              <div className = {cx("bg-black w-full text-white px-3 py-2 rounded-r-xl rounded-l-2xl bg-blue-500 break-all", `messagethemes${idGroup}`)} style={{
                "backgroundImage": theme && theme,
                "backgroundAttachment": "fixed",
                "backgroundSize": "cover",
                "position": "relative",
                "color": "white",
              }}>
                { message.content }
              </div>
            </ShowTabName>
            <div className="ml-2 text-gray-500">
              <FontAwesomeIcon icon={faCheckCircle}/>
            </div>
          </div>
        </div>
      </div>
  )
};

export default MessageForMe;
