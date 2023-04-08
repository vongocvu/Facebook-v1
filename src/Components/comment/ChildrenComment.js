/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState, useRef } from "react"

import CommentLayout from "./layoutComment"
import ChildComment from "./ChildComment"
import InputComment from "./inputComment"

const socket = require("socket.io-client")(process.env.REACT_APP_API)


const ChildrenComment = ({ inputCommenting, post, parent_id }) => {

      const [ Comments, setComments ] = useState([])
      const [ inputCommenting_children, setInputCommenting_children ] = useState({})
      const [ newComments, setNewComments ] = useState([])
      const [ limit, setLimit ] = useState(1)
      const [ hasMore, setHasMore ] = useState(true)
      const lastCommentRef2 = useRef(null)

   useEffect(() => {
      socket.on('comment', comment => {
        if (comment.level === '2' && parent_id === comment.parent_id) {
          lastCommentRef2?.current?.scrollIntoView({
            behavior: "smooth", // cuộn mượt hơn
            block: "center" // phần tử được đưa vào trung tâm của cửa sổ xem
          })
             setNewComments([  ...newComments, comment ])
           }
      })
    })
      
      useEffect(() => {
         const fecthData = async () => {
          parent_id !== undefined && 
            await axios.get(`${process.env.REACT_APP_API}/v1/comment/getByParent/${parent_id}/${limit}`)
            .then(response => {
              setComments(response.data)
              setNewComments([])
              response.data.length < limit && setHasMore(false)
            })
         }
         fecthData()
      },[parent_id, limit])

      const handlerShowInput = (idComment, username) => {
         setInputCommenting_children({idComment, username, isReply : true})
       }

       const handleViewMoreComment = () => {
        setLimit(limit + 5)
     }

  return (
     <>
        {
          Comments.map((comment, index) => (
            <div className="pl-10 line-comment-children border-left" key={index}>
                <CommentLayout handlerCommenting={handlerShowInput} level="2" data={comment} />
                <ChildComment inputCommenting_child={inputCommenting_children} post={post} parent_id={comment._id}/>
            </div>
          ))
        }

          {
            newComments.map((comment, index) => (
              <div className="pl-10 line-comment-children border-left" key={index}>
                  <CommentLayout handlerCommenting={handlerShowInput} level="2" data={comment} />
                  <ChildComment inputCommenting_child={inputCommenting_children} post={post} parent_id={comment._id}/>
              </div>
            ))
          }
          <div ref={lastCommentRef2}></div>
          {
             hasMore &&
             <div className="pl-10 mb-2">
                  <span onClick={handleViewMoreComment} className="hover:underline primary-text cursor-pointer font-medium text-sm">View more comments</span>
             </div>
           }

        { inputCommenting?.isReply && inputCommenting?.idComment === parent_id && 
             <div className="pl-10 line-input">
               <InputComment isFocus={inputCommenting?.username} post={post} parent_id={parent_id} level="2"/>
             </div> 
        }
     </>
  )
}

export default ChildrenComment