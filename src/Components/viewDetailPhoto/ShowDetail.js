import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"
import { useNavigate } from "react-router-dom"

const ShowDetail = ({photo, data, type}) => {

  const navigate = useNavigate()

   const handleHideForm = () => {
      navigate("/")
   }

   const handleViewImage = (idPhoto) => {
    navigate(`/detail_photos_${type}/${idPhoto}`)
   }

     return (
       <div className=" fixed top-[60px] inset-0 flex-center z-20" >
           <div className="absolute inset-[-30px] blur-[15px]">
               <img className="w-full h-full object-cover" alt="anh" src={photo} />
           </div>
            <div className="absolute inset-0 bg-black bg-opacity-10">
                 <div className="w-full h-[91%] flex flex-col items-center">
                    <img className="w-full h-full object-contain" alt="anh2" src={photo} />
                    <div className="py-3 h-[80px] flex items-center">
                      {
                        data && data.map((image, i) => (
                          image?.image && image?.image !== "" && <img onClick={ e => handleViewImage(image?._id)} key={i} className={`${photo === image?.image ? 'opacity-100' : 'opacity-50'} min-h-full max-w-[50px] b-full object-cover object-cover rounded-lg mx-1 hover:opacity-100 cursor-pointer`} src={image?.image} alt="anh33" />
                        ))
                      }
                    </div>
                 </div>
            </div>
            <div onClick={handleHideForm} className="min-w-[50px] min-h-[50px] flex-center text-2xl cursor-pointer rounded-full text-white cart-bg hover-dark absolute top-[20px] left-[20px]">
                <FontAwesomeIcon icon={faXmark} />
            </div>
       </div>
     )
}

export default memo(ShowDetail)