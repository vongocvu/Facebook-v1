/* eslint-disable react-hooks/rules-of-hooks */
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
const socket = io(process.env.REACT_APP_API)

const listenMessages = (RoomChattings) => {
  const dispatch = useDispatch()
  socket.on('message', message => {
    if (!RoomChattings.includes(message.group)) {
      dispatch({
       type: 'ADD',
       payload: message.group
      })
    }
  })
}


const sendMessage = (message) => {
    socket.emit('message', {
        userId : message.userId,
        username: message.username,
        message: message.message
    })
}

const getMessage = () => {
    socket.off('message')
    socket.on('message', (message) => {
      return message
    })
}

export {
  listenMessages,
  sendMessage,
  getMessage
}