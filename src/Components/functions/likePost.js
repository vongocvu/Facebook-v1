import axios from "axios"

const likePost = async (id, react, type) => {
    await axios.post(`${process.env.REACT_APP_API}/v1/${type}/like${type.charAt(0).toUpperCase() + type.slice(1)}/${id}`, {
      react: react
    })
}

const cancelLikePost = async (id, user, type) => {
    await axios.post(`${process.env.REACT_APP_API}/v1/${type}/cancelLike${type.charAt(0).toUpperCase() + type.slice(1)}/${id}`, {
      user: user
  })
}

export {
  likePost,
  cancelLikePost
}