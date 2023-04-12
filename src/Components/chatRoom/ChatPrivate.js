/* eslint-disable react-hooks/exhaustive-deps */
import { faChevronDown, faCirclePlus, faGift, faImage, faMinus, faNoteSticky, faPaperPlane, faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import TextareaAutosize from "react-textarea-autosize";

import classNames from "classnames/bind"
import io from 'socket.io-client'
import axios from "axios"

import styles from './chatRoom.module.scss'
import handlerChat from "../functions/handlerChat"
import SettingsChatBox from "./forms/settingOnChatBox"
import ShowTabName from "../tooltip"
import FirstChat from "./message/firstChat"
import HandlerShowMessage from "./message/handlerShowMessage"
import LoadingChatBox from "../loadings/LoadingChatBox";



const socket = io(process.env.REACT_APP_API)
const cx = classNames.bind(styles)

const ChatPrivate = ({ data, chatWindow, roomChating }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const { rooms, roomsWait, usersOnline } = useSelector(state => ({...state}))

  const messageListRef = useRef(null);
  const inputRef = useRef(null);
  const oldMessageRef = useRef(null);
  const fileRef = useRef(null);
  const showOptionsBtn = useRef(null);

  const [ inputChat, setInputChat ] = useState('')
  const [ ChatList, setChatList ] = useState([])
  const [ friend, setFriend ] = useState({})

  const [ hidden, setHidden ] = useState(false)
  const [ limit, setLimit ] = useState(20)
  const [ formOptions, setFormOptions ] = useState(false)
  const [ newMessage, setNewMessage ] = useState([])
  const [ IsChatting, setIsChatting ] = useState(false)
  const [ HasMore, setHasMore ] = useState(true)
  const [ image, setImage ] = useState([])
  const [ showImage, setShowImage ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ newIdMessage, setNewIdMessage ] = useState({})



  useEffect(() => {
    !chatWindow && rooms.includes(data._id) && setHidden(true)
    !chatWindow && !rooms.includes(data._id) && setHidden(false)
  },[rooms])

  useEffect(() => {
    chatWindow && setHidden(false)
    data._id === roomChating && setHidden(true)
  },[roomChating])

 useEffect(() => {
  if (rooms.length > 3) {
    if (data._id === rooms[0]) {
      dispatch({
        type: "DELETE_ROOM",
        payload: rooms[0]
      })

      dispatch({
        type: "ADD_ROOM_WAIT",
        payload: { _id: data._id, avatar: friend.user.avatar, name: friend.user.username }
      })
    }
  }

},[rooms])


  useEffect(() => {
     data.members.forEach(member => {
        if (member.user._id !== user._id) {
          setFriend({...member})
        }
     })
  },[])

  useEffect(() => {
    socket.on('message', message => {
      messageListRef?.current && messageListRef.current.scrollIntoView()
      if (message.group === data._id ) {
        
           message.sender._id !== user._id && setIsChatting(true)
           dispatch({
              type: "ADD_ROOM",
              payload: message.group
            })
            setNewMessage([...newMessage, message])
            !chatWindow && setHidden(true)
        }
    })
  }, [newMessage])

  useEffect(() => {
    if ( newMessage?.length > 0 && newMessage[newMessage.length - 1]?.content === newIdMessage?.content) {
      newMessage[newMessage.length - 1]._id = newIdMessage?._id
      setNewMessage([...newMessage])
    }
  },[newIdMessage, newMessage])


  useEffect(() => {
    socket.on('imageMessage', data => {
      newMessage.forEach(message => {
        if (message.image === data.image) {
          Object.assign(message, {image: data.newImage})
        }
      })
      setNewMessage(newMessage)
    })
    setNewMessage(newMessage)
  }, [newMessage])

  const getMessages = async () => {
      if (HasMore) {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_API}/v1/message/getByGroup/${data._id}/${limit}`)
        .then((response) => {
          const messages = response.data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          setChatList([...messages]);

          if ( response.data.messages.length < limit ) {
              setHasMore(false)
            } else {
                setLimit(limit + 10)
            }
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    getMessages()
  },[])

  const handlerSendMessage = async (e) => {
    if (inputChat.length > 0 || image.length > 0 ) {
      setInputChat("")
      setShowImage("")
      setImage([])
      const getIdMess = await handlerChat.senderMessage({
        sender: {
          _id: user._id,
          avatar: user.avatar,
          username: user.username
        },
        group: data._id,
        image: showImage !== "" ? showImage : "",
        file: image.length > 0 ? image : "",
        content: inputChat
      })
      setNewIdMessage(getIdMess)
    }
  } 

  const handlerDeleteChatBox = () => {

    roomsWait.length > 0 && dispatch({
      type: "ADD_ROOM",
      payload: roomsWait.pop()._id
    })
    
    dispatch({
      type: "DELETE_ROOM",
      payload: data._id
    })

    setHidden(false);

  }

  const handlerViewMoreMess = () => {
        getMessages()
  }

  const handlerWaitChatBox = () => {
    dispatch({
      type: "ADD_ROOM_WAIT",
      payload: {_id: data._id, avatar: friend.user.avatar}
    })

    dispatch({
      type: "DELETE_ROOM",
      payload: data._id
    })

    setHidden(false);
  }

  const handlerOption = (e) => {
    setFormOptions(!formOptions)
  }

  const handlerHideOption = (e) => {
    setFormOptions(false)
  }

  const gotoProfile = () => {
    'notthing !'
  }

  const handlerSended = () => {
     setIsChatting(false)
  }

  const handlerOpenFile = () => {
    fileRef?.current?.click()
  }

  const handlerCancelImage = () => {
    setShowImage("")
  }

  useEffect(() => {
     image.length > 0 && setShowImage(URL.createObjectURL(image[0]))
  }, [image])

  useEffect(() => {
    messageListRef?.current?.scrollIntoView()
  },[hidden])

  
    
return hidden && 
    (
      <div onClick={handlerSended} id={data._id} oldtheme={data.theme} tabIndex="0" className={cx(`${chatWindow ? 'w-full h-full active' : 'w-[350px] h-[500px] ml-2 shadow-2xl rounded-t-lg b-full border '} `,`flex flex-col bg-white rounded-t-lg secondary-bg dark:text-white relative `, 'ChatBox')}>
        { formOptions && <SettingsChatBox showOptionsBtn={showOptionsBtn?.current} idUser={friend.user._id} idGroup={data._id} hide={handlerHideOption} type="groupPrivate"/> }
        <div className={cx(`w-full px-1 ${chatWindow ? 'h-[65px] border-b b-bottom' : `h-[50px]  ${IsChatting ? 'bg-blue-500 text-white dark:text-white' : 'secondary-bg bg-white'}`} rounded-t-lg flex items-center justify-between p-1 border-b  b-bottom`,'actived')}>
                  <div className={`flex items-center ${!chatWindow && 'dark:hover:bg-gray-800 hover:bg-gray-200 hover-dark'} cursor-pointer pl-2 pr-3 rounded-lg`}>
                    <div className={cx('h-[40px] w-[40px] mr-2 rounded-full relative', `${usersOnline.some(userOnline => userOnline._id === friend.user._id) && 'border-[2px] border-white'}`)}>
                      <img className="w-full h-full rounded-full" src={friend.user.avatar} alt="" />
                      {
                        usersOnline.some(userOnline => userOnline._id === friend.user._id) && (
                            <div className='absolute w-[15px] h-[15px] bottom-[-3px] right-0 bg-white rounded-full flex items-center justify-center'>
                                  <span className='w-[10px] h-[10px] bg-green-500 rounded-full'></span>
                            </div>
                         )
                      }
                    </div>
                    <ShowTabName tabName={`${!chatWindow ? 'Setting' : friend.user.username}`}> 
                      <div ref={showOptionsBtn} id={`btnShowOption${data._id}`} onMouseDown={!chatWindow ? handlerOption : gotoProfile} className={cx('')}>
                          <h4 className={cx('font-medium leading-3 text-sm')}>{friend.nickname !== "" ? friend.nickname : friend.user.username}</h4>
                          <span className={cx('text-sm leading-3 font-thin ')}>{usersOnline.some(userOnline => userOnline._id === friend.user._id) ? 'Active now' : "10 minutes ago"}</span>
                      </div>
                    </ShowTabName>
                    <FontAwesomeIcon className="ml-3 text-sm font-thin focusChatBox" icon={faChevronDown}/>
                  </div>
           { !chatWindow && 
                <div className="flex w-[50px] justify-between mr-3 text-xl text-gray-300 text-gray-300 dark:text-gray-400">
                    <div onClick={handlerWaitChatBox} className="cursor-pointer focusChatBox hover:translate-y-[-3px]"><FontAwesomeIcon icon={faMinus} /></div>
                    <div onClick={handlerDeleteChatBox} className="cursor-pointer focusChatBox hover:translate-y-[-3px]"><FontAwesomeIcon icon={faXmark} /></div>
                </div>
           }
        </div>

        <div className={cx('flex-1 overflow-y-scroll text-sm pb-5 secondary-bg', 'custom_scroll')} > 
                   { loading && <LoadingChatBox /> }
                   { !HasMore &&  <FirstChat avatar={friend.user.avatar}/> }
                   { HasMore &&  <div onClick={handlerViewMoreMess} ref={oldMessageRef}className="text-center py-4 hover:underline hover:text-blue-300 cursor-pointer">... Click to view more ...</div> }
                    <HandlerShowMessage chatList={ChatList} user={user} data={data}/>
                    <HandlerShowMessage chatList={newMessage} user={user} data={data}/>
                   <div ref={messageListRef}></div>
        </div>

        <div className={cx('absolute bottom-0 flex items-center px-3 py-2 text-gray-300 dark:text-gray-400 border-t border-gray-200 b-top relative z-[1] secondary-bg')}>
            <div className={cx('flex flex-nowrap text-xl h-full items-end mb-6')}>
              <FontAwesomeIcon icon={faCirclePlus} className={cx('mr-3 cursor-pointer hover:translate-y-[-3px] transition relative focusChatBox')}/>
              <FontAwesomeIcon onClick={handlerOpenFile} icon={faImage} className={cx('mr-3 cursor-pointer hover:translate-y-[-3px] transition focusChatBox')}/>
              <input onChange={ e => setImage(e.target.files) } ref={fileRef} type="file" className="hidden" />
              <FontAwesomeIcon icon={faNoteSticky} className={cx('mr-3 cursor-pointer hover:translate-y-[-3px] transition focusChatBox')}/>
              <FontAwesomeIcon icon={faGift} className={cx('mr-3 cursor-pointer hover:translate-y-[-3px] transition focusChatBox')}/>
            </div>
                {
                  showImage !== "" && <div className="absolute right-[10px] bottom-[70px] w-[150px]" >
                     <img className="w-full rounded-xl b-full" src={showImage} alt="anh" />
                     <div onClick={handlerCancelImage} className="absolute top-[-10px] left-[-10px] text-xl w-[30px] h-[30px] flex-center bg-gray-900 dark:bg-white rounded-full cursor-pointer hover:text-red-500 b-full">
                         <FontAwesomeIcon icon={faXmark} />
                     </div>
                  </div>
                }

            <TextareaAutosize
                ref={inputRef}
                value={inputChat} 
                onChange={e =>  setInputChat(e.target.value)} 
                onKeyDown={e =>{ e.keyCode === 13 && handlerSendMessage() && e.preventDefault()}}
                className={cx('h-full w-full mb-1 pl-4 py-2 rounded-3xl px-2 outline-0 custom_scroll resize-none text-black dark:text-white comment-bg bg-gray-200 border border-gray-300 b-full relative z-[1]')} placeholder="Aa"
                minRows={1}
                maxRows={5}
               />

              <div className="h-full flex items-end mb-6">
           { inputChat === "" && <FontAwesomeIcon icon={faThumbsUp} className={cx('ml-2 cursor-pointer focusChatBox text-xl')}/> }
           { inputChat !== "" && <FontAwesomeIcon onClick={e => handlerSendMessage()} icon={faPaperPlane} className={`${(inputChat.trim() !== "" || showImage !== "")? "text-blue-500 hover:opacity-80 cursor-pointer " : "cursor-not-allowed "} ml-2 mb-1`}/> }
            </div>
        </div>
      </div>
    )
}

export default ChatPrivate