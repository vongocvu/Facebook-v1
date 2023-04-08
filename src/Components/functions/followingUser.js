import axios from "axios"


const followingUser = async (user, friend) => {
   await axios.post(`${process.env.REACT_APP_API}/v1/auth/followingUser/${friend}`, {
      user: user
   })
   .then(response => {
       return response.data
   })
}

const unFollowingUser = async (user, friend) => {
   await axios.post(`${process.env.REACT_APP_API}/v1/auth/unFollowingUser/${friend}`, {
      user: user
   })
   .then(response => {
       return true
   })
}

const handlerConfirmRequest = async (user, friend) => {
   await axios.post(`${process.env.REACT_APP_API}/v1/auth/accessFriend/${user}`, {
      friend: friend
   })
   .then(response => {
       return true
   })
}

const handlerDeleteRequest = () => {

}

export { 
   followingUser,
   unFollowingUser,
   handlerConfirmRequest,
   handlerDeleteRequest
}