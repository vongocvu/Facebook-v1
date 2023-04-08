/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom"
import ShowDetail from "./ShowDetail"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { memo } from "react"

const DetaiPhotoComment = () => {

   const { idComment} = useParams()
   const [ image, setImage ] = useState("")
   const [ dataImages, setDataImages ] = useState([])

   useEffect(() => {
       const fecthData = async () => {
           await axios.get(`${process.env.REACT_APP_API}/v1/comment/getCommentImage/${idComment}`)
           .then(response => {
            setImage(response.data.image)
            setDataImages(response.data.dataImages)
           })
       }
       fecthData()
   },[idComment])

  return (
      <ShowDetail photo={image} data={dataImages} type="comment"/>
  )
}

export default memo(DetaiPhotoComment)