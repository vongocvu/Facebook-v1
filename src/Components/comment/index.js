/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import axios from "axios"

import ChildrenComment from "./ChildrenComment"
import CommentLayout from "./layoutComment"

const socket = require("socket.io-client")(process.env.REACT_APP_API)

const CommentPost = ({post}) => {

   const [ Comments, setComments ] = useState([])
   const [ inputCommenting, setInputCommenting ] = useState({})
   const [ newComments, setNewComments ] = useState([])
   const [ HasMore, setHasMore ] = useState(true)
   const [ limit, setLimit ] = useState(5)
   
   const lastCommentRef1 = useRef(null)


  useEffect(() => {
    socket.on('comment', comment => {
      if (comment.level === '1' && comment.post === post?._id) {
        lastCommentRef1?.current?.scrollIntoView({
        behavior: "smooth", // cuộn mượt hơn
        block: "center" // phần tử được đưa vào trung tâm của cửa sổ xem
      })
          setNewComments([ comment, ...newComments ])
        }
    })
  })

useEffect(() => {
    const fecthData = async () => {
      post?._id !== undefined &&
       await axios.get(`${process.env.REACT_APP_API}/v1/comment/getByPost/${post?._id}/${limit}`)
       .then(response => {
         setComments(response.data)
         setNewComments([])
         response.data.length < limit && setHasMore(false)
       })
    }
    fecthData()
},[post?._id, limit])

const handlerShowInput = (idComment, username) => {
  setInputCommenting({idComment, username, isReply: true})
}

const handleViewMoreComments = () => {
  setLimit(limit + 10)
}

const handlegetLike = (react, id) => {
  const index = newComments?.findIndex(comment => comment._id === id)

  if (index !== -1) {
    newComments[index].react = react
    setNewComments([...newComments])
  }
}

  return (
       <>
              <div ref={lastCommentRef1}></div>
            {
              newComments?.map((comment, index) => (
                <div className="line-comment-parent border-left" key={index}>
                  <CommentLayout getLike={handlegetLike} handlerCommenting={handlerShowInput} level="1" data={comment}/>
                  <ChildrenComment inputCommenting={inputCommenting} post={post._id} parent_id={comment?._id}/>
                </div>
              ))
            }
          {
            Comments.map((comment, index) => (
              <div className="line-comment-parent border-left" key={index}>
                <CommentLayout handlerCommenting={handlerShowInput} level="1" data={comment}/>
                <ChildrenComment inputCommenting={inputCommenting} post={post._id} parent_id={comment?._id}/>
              </div>
            ))
          }
          {
            HasMore && <div className="primary-text text-sm py-4 pl-5 flex justify-between">
              <span onClick={handleViewMoreComments} className="hover:underline cursor-pointer font-medium ">View more comments</span>
              <span>{limit} of {post?.countComments}</span>
            </div>
          }
       </>
   )
}

export default CommentPost