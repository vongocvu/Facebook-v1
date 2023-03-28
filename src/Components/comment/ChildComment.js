/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useRef } from "react"
import { useEffect, useState } from "react"
import InputComment from "./inputComment"

import CommentLayout from "./layoutComment"

const socket = require("socket.io-client")('http://localhost:8000')


const ChildComment = ({inputCommenting_child, post, parent_id}) => {

      const [ Comments, setComments ] = useState([])
      const [ inputCommenting_children, setInputCommenting_childrend ] = useState({})
      const [ newComments, setNewComments ] = useState([])
      const lastCommentRef3 = useRef(null)

       useEffect(() => {
      socket.on('comment', comment => {
        if (comment.level === '3' && parent_id === comment.parent_id) {
          lastCommentRef3?.current?.scrollIntoView({
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
            await axios.get(`http://localhost:8000/v1/comment/getByParent/${parent_id}`)
            .then(response => {
              setComments(response.data)
              setNewComments([])
            })
         }
         fecthData()
      },[parent_id])

      const handlerShowInput = (idComment, username) => {
         setInputCommenting_childrend({idComment: parent_id, username, isReply: true})
       }

  return (
     <>
        
        {
          Comments?.map((comment, index )=> (
            <div className="pl-10 line-comment-child" key={index}>
                <CommentLayout handlerCommenting={handlerShowInput} level="3" data={comment} />
            </div>
          ))
        }

        {
          newComments?.map((comment, index )=> (
            <div className="pl-10 line-comment-child" key={index}>
                <CommentLayout handlerCommenting={handlerShowInput} level="3" data={comment} />
            </div>
          ))
        }
 
           <div ref={lastCommentRef3}></div>

        { (inputCommenting_children?.isReply || inputCommenting_child?.isReply ) &&
          (inputCommenting_child?.idComment === parent_id || inputCommenting_children?.idComment === parent_id) &&
             <div className="pl-10 line-input">
               <InputComment isFocus={inputCommenting_child?.username || inputCommenting_children?.username} post={post} parent_id={parent_id} level="3"/>
             </div> 
        }

        
     </>
  )
}

export default ChildComment