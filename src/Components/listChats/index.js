/* eslint-disable react-hooks/exhaustive-deps */
import { faEdit, faEllipsis, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"


import Search from "../search"
import { useEffect, useState } from "react"
import Moment from "../moments"
import LoadingChatBox from "../loadings/LoadingChatBox"
const socket = require('socket.io-client')(process.env.REACT_APP_API)


const ListChats = ({ roomActive, show, handlerShowMessage, chatGlobal }) => {

 const { user, usersOnline } = useSelector(state => ({ ...state }))
 const navigate = useNavigate()

 const [ ListMessage, setListMessage ] = useState([])
 const [ GroupNotSend, setGroupNotSend ] = useState([])
 const [ connected, setConnected] = useState(false);
 const [ loading, setLoading ] = useState(false)


 useEffect(() => {
  socket.on('message', message => {

        message.sender._id !== user._id && setGroupNotSend([...GroupNotSend, {Group: { _id: message.group}}])

        ListMessage.forEach((list => {
          if (list.Group?._id === message.group) {
              
              if (list?.message?.content ) {
                list.message.content = message.content
                list.message.sender = message.sender 
              } else {

                Object.defineProperty(list, "message", { value: {content: message.content, sender: message.sender, createdAt: new Date()}});
              }
                list?.message?.content && Object.assign(list.message, { createdAt: new Date()}); 
                setListMessage(() => ListMessage.sort((a, b) => new Date(b.message?.createdAt) - new Date(a.message?.createdAt)))
            }
        }))
      })
},[ListMessage])

    
 useEffect(() => {
      socket.on("createGroup", (data) => {
        setConnected(!connected);
      });

     const fetchData = async () => {
      setLoading(true)
         await axios.get(`${process.env.REACT_APP_API}/v1/group/getMyGroups/${user._id}`)
         .then((response) => {
          setListMessage(response.data.sort((a, b) => new Date(b.message?.createdAt) - new Date(a.message?.createdAt)))
          setGroupNotSend(response.data.filter(data => !data?.message?.sended?.includes(user._id)))
          setLoading(false)
        })
      }  
      fetchData()
    },[connected])

 const handlerSendMessage = async (idMessage, idGroup) => {
      !chatGlobal && navigate(`/message/${idGroup}`)
       chatGlobal && handlerShowMessage(idGroup)
    if (GroupNotSend.some( data => data.Group._id === idGroup)) {
      setGroupNotSend(() => GroupNotSend.filter((group) => group.Group._id !== idGroup))
      idMessage !== undefined && await axios.post(`${process.env.REACT_APP_API}/v1/message/sendMessage/${idMessage}`, {
          user: user._id
      })
    }
 }


  return show && (
     <div className="w-full h-full flex flex-col secondary-bg bg-white b-right p-3 primary-text border-r border-gray-200">
           {loading && <LoadingChatBox />}
        <div className="flex h-[50px] justify-between items-center mb-2">
          <h3 className="text-2xl font-bold">Chats</h3>
          <div className="flex">
            <div className="w-[40px] h-[40px] cart-bg hover-dark cursor-pointer rounded-full ml-3 flex-center text-xl"><FontAwesomeIcon icon={faEllipsis}/></div>
            <div className="w-[40px] h-[40px] cart-bg hover-dark cursor-pointer rounded-full ml-3 flex-center text-xl"><FontAwesomeIcon icon={faVideo}/></div>
            <div className="w-[40px] h-[40px] cart-bg hover-dark cursor-pointer rounded-full ml-3 flex-center text-xl"><FontAwesomeIcon icon={faEdit}/></div>
          </div>
        </div>
        <Search/>
        <div className="mt-2 w-full flex-1 overflow-y-scroll overflow-x-hidden custom_scroll">
            {
              ListMessage?.map((message, index) => (
              <div onClick={ e => handlerSendMessage(message?.message?._id, message?.Group?._id)}  key={index} className={`${roomActive === message?.Group?._id && 'comment-bg'} flex items-center hover-dark hover:bg-gray-200 p-2 rounded-lg cursor-pointer `}>
                  <div className="min-w-[50px] max-w-[50px] h-[50px] mr-4 relative">
                    <img className="w-full h-full rounded-full" src={message?.Group?.avatar ? message?.Group?.avatar : message?.friend?.user?.avatar} alt="anh dai dien"/>
                    {
                        usersOnline.some(userOnline => userOnline._id === message?.friend?.user._id) && (
                            <div className='absolute w-[15px] h-[15px] bottom-[-3px] right-0 bg-white rounded-full flex items-center justify-center'>
                                  <span className='w-[10px] h-[10px] bg-green-500 rounded-full'></span>
                            </div>
                         )
                      }
                  </div>
                  <div className={`flex-1 overflow-hidden ${GroupNotSend.some( data => data.Group._id === message?.Group?._id) ? 'opacity-100 text-white font-medium' :  'opacity-80 '}  `}>
                          <div className="flex justify-between">
                             <h4 className="text-md text-gray-500 primary-text">{message?.Group?.name ? message?.Group?.name : message?.friend?.user?.username} </h4>
                             <div className="flex items-center">
                                
                                  
                                  <div className={`${GroupNotSend.some( data => data.Group._id === message?.Group?._id) ? 'text-blue-400' : 'text-gray-500'}  ml-2 `}>
                                      <img className="w-[15px] h-[15px] rounded-full" src={message?.message?.sender.avatar} alt="avatar" />
                                  </div>
                                
                                <span className="text-xs ml-2">{Moment(message?.message?.createdAt)}</span>
                             </div>
                          </div>
                          <div className={`${GroupNotSend.some( data => data.Group._id === message?.Group?._id) && 'text-blue-400'} text-sm text-over`} >
                            { message?.Group?.typeGroup !== 2 ? "" : message?.message?.sender._id !== user?._id 
                                ? <span >{message?.message?.sender?.username || 'Fb'}: </span> 
                                : <span className="">You: </span>} 

                                <span >
                                   {message?.message?.content || (message?.message?.image ? "Sended a photos..." : "You have become friends, let's get to know each other !")} 
                                </span>
                          </div>
                  </div>
              </div>
              ))
            }
        </div>
     </div>
  )
}

export default ListChats