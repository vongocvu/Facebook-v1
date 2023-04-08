/* eslint-disable no-const-assign */
import io from 'socket.io-client'
import axios from 'axios'
const socket = io(process.env.REACT_APP_API)

const handlerChat = {
  senderMessage: async (data) => {

    let newIdMessage = {}
      socket.emit('message',{
        sender: {
          _id: data.sender._id,
          avatar: data.sender.avatar,
          username: data.sender.username
        },
        group: data.group,
        image: data.image,
        content: data.content,
        _id: ""
      })
      const formData = new FormData();
      formData.append('sender', data.sender._id)
      formData.append('group', data.group)
      formData.append('content', data.content)
      formData.append('imageMessage', data.file[0])

      await axios.post(`${process.env.REACT_APP_API}/v1/message/add`, formData)
      .then(res => {
        socket.emit('imageMessage',{
          image: data.image,
          newImage: res.data.image,
          _id: res.data._id
        })
        newIdMessage = {
          _id: res.data._id,
          content: data.content
        }
      })

      return newIdMessage 
  },
  
}


export default handlerChat