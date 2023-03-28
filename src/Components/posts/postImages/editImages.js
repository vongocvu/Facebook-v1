/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowLeft, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const EditImages = (props) => {
   

  const [ coption, setCoption ] = useState([])

  useEffect(() => {

    props.data.length === 0 && hideEditImage()

  },[props.data])

  const handlerInputCoption = (e, image) => {
    setCoption({value: e.target.value, image: image})
  }

  const handlerCoption = () => {
      props.dataFile.forEach(file => {
           if (coption.image === file.name) {
             file['coption'] = coption.value
           }
      })
    }

    const hideEditImage = () => {
      props.handlerImagesDetail(props.dataFile)
      props.hideEdit()
    }
    
   const handlerDeleteImage = (url, name) => {
    props.deleteImage(url, name)
   }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10 flex-center">
            <div className="w-[800px] max-h-[700px] secondary-bg rounded-xl bg-white shadow-dark p-4 pt-0 shadow-md shadow-gray-400 flex flex-col">
               <div className="min-h-[60px] flex-center dark:text-white font-bold text-xl relative">
                   Photos/Videos
                   <div onClick={hideEditImage} className="absolute left-[10px] w-[40px] h-[40px] flex-center comment-bg rounded-full hover:opacity-80 cursor-pointer">
                     <FontAwesomeIcon icon={faArrowLeft}/>
                   </div>
               </div>
               <div className="grid grid-cols-12 gap-1 flex-1 p-2 overflow-y-scroll custom_scroll rounded-lg h-full">
                  {
                    props.data.map((image, i) => (
                      <div key={i} className="col-span-4 h-[330px] relative px-2 cart-bg pt-2 rounded-lg">
                         <div onClick={e => handlerDeleteImage(image.url, image.name)} className="absolute top-[10px] right-[10px] w-[30px] h-[30px] flex-center text-xl bg-white rounded-full cursor-pointer hover:opacity-80">
                             <FontAwesomeIcon icon={faXmark}/>
                         </div>

                         <img className="w-full h-[80%] object-cover rounded-md" src={image.url} alt="anh" />
                         <div className="w-full">
                              <input onBlur={handlerCoption} type="text" onChange={ e => handlerInputCoption(e, image.name)} className="w-full h-full mt-2 px-2 bg-transparent dark:text-white py-3" placeholder="Coption"/>
                         </div>
                      </div>
                    ))
                  }
               </div>
            </div>
    </div>
  )
}

export default EditImages