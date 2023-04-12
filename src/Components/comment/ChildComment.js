/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useRef } from "react"
import { useEffect, useState } from "react"
import InputComment from "./inputComment"

import CommentLayout from "./layoutComment"

const socket = require("socket.io-client")(process.env.REACT_APP_API)


const ChildComment = ({inputCommenting_child, post, parent_id}) => {

      const [ Comments, setComments ] = useState([])
      const [ inputCommenting_children, setInputCommenting_childrend ] = useState({})
      const [ newComments, setNewComments ] = useState([])
      const [ limit, setLimit ] = useState(2)
      const [ hasMore, setHasMore ] = useState(true)
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
      socket.on('UpdateComment', comment => {
          const index = newComments?.findIndex(Oldcomment => Oldcomment.content === comment.content)

          if ( index !== -1 ) {
            setTimeout(() => {
                newComments[index]._id = comment._id
                newComments[index].image = comment.image
                setNewComments([...newComments])
            },1000)
          }
      })
  },[newComments])

      useEffect(() => {
         const fecthData = async () => {
          parent_id !== "" &&
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
         setInputCommenting_childrend({idComment: parent_id, username, isReply: true})
       }

       const handleViewMoreComment = () => {
          setLimit(limit + 5)
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
           {
             hasMore &&
             <div className="pl-10 mb-2">
                  <span onClick={handleViewMoreComment} className="hover:underline primary-text cursor-pointer text-sm font-medium">View more comments</span>
             </div>
           }

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