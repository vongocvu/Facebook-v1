import io from 'socket.io-client'
import axios from 'axios'
const socket = io("https://sever-facebook-fake.vercel.app")

const handlerChat = {
  senderMessage: async (data) => {
      socket.emit('message',{
        sender: {
          _id: data.sender._id,
          avatar: data.sender.avatar,
          username: data.sender.username
        },
        group: data.group,
        content: data.content,
      })

      await axios.post(`https://sever-facebook-fake.vercel.app/v1/message/add`, {
        sender: data.sender,
        group: data.group,
        content: data.content
      })
  },
  
}


export default handlerChat