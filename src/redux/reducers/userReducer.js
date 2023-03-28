import Cookies from "js-cookie";
const socket = require('socket.io-client')("https://sever-facebook-fake.vercel.app")

const userData = Cookies.get("CURENT_USER") ? JSON.parse(Cookies.get("CURENT_USER")) : null

const userReducer = (state = userData, action) => {
    switch (action.type) {
         case "LOGIN": 
             return action.payload
         case "LOGOUT":
             socket.emit('user_disconnected', state._id)
             return null
         default: return state
    }
}

export default userReducer