/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import axios from "axios"

import ChildrenComment from "./ChildrenComment"
import CommentLayout from "./layoutComment"

const socket = require("socket.io-client")("https://sever-facebook-fake.vercel.app")

const CommentPost = ({post}) => {


   const [ Comments, setComments ] = useState([])
   const [ inputCommenting, setInputCommenting ] = useState({})
   const [ newComments, setNewComments ] = useState([])
   
   const lastCommentRef1 = useRef(null)


   useEffect(() => {
     socket.on('comment', comment => {
       if (comment.level === '1' && comment.post === post) {
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
      post !== undefined &&
       await axios.get(`https://sever-facebook-fake.vercel.app/v1/comment/getByPost/${post}`)
       .then(response => {
         setComments(response.data)
         setNewComments([])
       })
    }
    fecthData()
},[post])

const handlerShowInput = (idComment, username) => {
  setInputCommenting({idComment, username, isReply: true})
}

  return (
       <>
              <div ref={lastCommentRef1}></div>
            {
              newComments?.map((comment, index) => (
                <div className="line-comment-parent border-left" key={index}>
                  <CommentLayout handlerCommenting={handlerShowInput} level="1" data={comment}/>
                  <ChildrenComment inputCommenting={inputCommenting} post={post} parent_id={comment?._id}/>
                </div>
              ))
            }
          {
            Comments.map((comment, index) => (
              <div className="line-comment-parent border-left" key={index}>
                <CommentLayout handlerCommenting={handlerShowInput} level="1" data={comment}/>
                <ChildrenComment inputCommenting={inputCommenting} post={post} parent_id={comment?._id}/>
              </div>
            ))
          }

       </>
   )
}

export default CommentPost