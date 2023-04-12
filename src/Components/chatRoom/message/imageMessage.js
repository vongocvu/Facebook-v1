import { useNavigate } from "react-router-dom"

const ImageMessage = ({src, id}) => {

  const navigate = useNavigate()

  const handleViewDetailPhoto = () => {
     navigate(`/detail_photos_message/${id}`)
  }

  return (
    <>
       { src.startsWith('blob') ? <div className="min-w-[30px]">
        <div className="py-2 px-3 cart-bg bg-gray-700 rounded-xl text-white">Uploading photos...</div>
       </div> : <img onClick={handleViewDetailPhoto} className="b-full rounded-xl cursor-pointer" src={src} alt="imageMsaage" />}
    </>
    
  )
}

export default ImageMessage