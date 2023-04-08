/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowRightFromBracket, faCircleDot, faImage, faMessage, faPen, faUserCircle, faUserLock, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IgnoreDynamic from '../../navigation/ignore_dynamic'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const SettingsChatBox = ({...props}) => {
    
  const formOptionsRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (!formOptionsRef?.current?.contains(e.target) && !props?.showOptionsBtn?.contains(e.target)) {
        props.hide();
      }
    }

    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    
  }, [props.hide, formOptionsRef]);

  const gotoLink = (link) => {
    props.hide();
    navigate(link)
  }

    return (
      <div ref={formOptionsRef} id={props.id} className="absolute right-[105%] top-[20px] z-[10]">
            <div className="w-[300px] bg-white secondary-bg shadow-md b-full rounded-md relative p-2">
                 <IgnoreDynamic onClick={e => gotoLink(`/message/${props.idGroup}`)} svg={<FontAwesomeIcon icon={faMessage}/>} text="Open in Messenger" height="h-[30px] mb-2" />
                 {props.type === "groupPrivate" && <IgnoreDynamic onClick={e => gotoLink(`/profile/${props.idUser}`)} svg={<FontAwesomeIcon icon={faUserCircle}/>} text="View profile" height="h-[30px] mb-2" />}
                 <hr className=" b-full mb-2"/>
                 <IgnoreDynamic onClick={e => gotoLink(`/setting/changetheme/${props.type}/${props.idGroup}`)} svg={<FontAwesomeIcon icon={faCircleDot}/>} text="Change theme" height="h-[30px] mb-2" className="text-blue-500" />
                 <IgnoreDynamic onClick={e => gotoLink(`/setting/changenickname/${props.type}/${props.idGroup}`)} svg={<FontAwesomeIcon icon={faPen}/>} text="Nicknames" height="h-[30px] mb-2" />
                 {props.type === "groupPublic" && <IgnoreDynamic svg={<FontAwesomeIcon icon={faPen}/>} text="Conversation name" height="h-[30px] mb-2" />}
                 {props.type === "groupPublic" && <IgnoreDynamic svg={<FontAwesomeIcon icon={faImage}/>} text="Change photo" height="h-[30px] mb-2" />}
                <hr className=" b-full mb-2"/>
                 {props.type === "groupPublic" && <IgnoreDynamic svg={<FontAwesomeIcon icon={faUserPlus}/>} text="Add people" height="h-[30px] mb-2" />}
                 {props.type === "groupPublic" && <IgnoreDynamic svg={<FontAwesomeIcon icon={faArrowRightFromBracket}/>} text="Leave group" height="h-[30px] mb-2" />}
                 {props.type === "groupPrivate" && <IgnoreDynamic svg={<FontAwesomeIcon icon={faUserLock}/>} text="Block" height="h-[30px]" />}
                <div className="absolute top-[-1px] right-0 w-[20px] h-[25px] secondary-bg bg-white translate-x-[15px]  border-r border-t border-t-gray-300 border-r-gray-300 dark:border-t-gray-600 dark:border-r-gray-600 rounded-br-[40px] rounded-tr-[5px]"></div>
            </div>
      </div>
    )
}

export default SettingsChatBox