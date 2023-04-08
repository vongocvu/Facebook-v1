import { useNavigate } from "react-router-dom"

const ImageMessage = ({src, id}) => {

  const navigate = useNavigate()

  const handleViewDetailPhoto = () => {
     navigate(`/detail_photos_message/${id}`)
  }

  return (
    <img onClick={handleViewDetailPhoto} className="b-full rounded-xl cursor-pointer" src={src} alt="imageMsaage" />
  )
}

export default ImageMessage