import { useRef, useState } from "react"

import { faPen, faPlusSquare, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EditImages from "./editImages"
import ShowImages from "../ShowImagesAdd"

const AddImages = (props) => {

    const inputBtnRef = useRef(null)
    const [ images, setImages ] = useState([])
    const [ dataFile, setDataFile] = useState([])
    const [ editImages, setEditImages ] = useState(false)


    const handleImageSelect = (e) => {
      const files = Array.from(e.target.files);
      const selectedImagesUrls = files.map((file) => ({ url: URL.createObjectURL(file), name: file.name}));
      setImages([...images, ...selectedImagesUrls]);
      setDataFile([...dataFile, ...files])
      props.selectedImages(e.target.files)
    };
    
    const handleImageRemove = (url, name) => {
      const filteredImages = images.filter((image) => image.url !== url);
      setImages(filteredImages);

      const DataArr = dataFile.filter(file => file.name !== name);
      setDataFile(DataArr)
      props.selectedImages(DataArr)
    };

    const handlerOpenFile = () => {
      inputBtnRef?.current?.click()
    }
    
    const handlerHiddenAddImages = () => {
      props.hiddenAddImages()
    }

    const handlerShowEditImages = () => {
      setEditImages(true)
    }

    const handleHideEdit = () => {
      setEditImages(false)
    }

    const handlerDetailImage = (data) => {
      setDataFile(data)
      console.log(data);
    }

   return (
     <div className="w-full rounded-lg b-full p-2 mb-4 relative">
          <form className="hidden" method="post" encType="multipart/form-data">
            <input ref={inputBtnRef} onChange={handleImageSelect} multiple type="file"/>
          </form>
            <div onClick={handlerHiddenAddImages} className="absolute primary-text w-[30px] h-[30px] flex-center right-[15px] top-[15px] hover-dark text-lg primary-bg cursor-pointer rounded-full ">
                <FontAwesomeIcon icon={faXmark} />
            </div>
            {
              images.length > 0 && 
                <div className="absolute top-[15px] left-[15px]">
                      <button onClick={handlerShowEditImages} className="bg-white px-3 py-1 rounded-lg hover:opacity-80 font-medium mr-3"><FontAwesomeIcon icon={faPen}/> Edit</button>
                      <button onClick={handlerOpenFile} className="bg-white px-3 py-1 rounded-lg hover:opacity-80 font-medium"><FontAwesomeIcon icon={faPlusSquare}/> Add Photos/Videos</button>
                </div>
            }

            {
              images.length === 0 && <div onClick={handlerOpenFile} className="flex-center w-full h-[230px] rounded-md cart-bg cart-hover cursor-pointer ">
                  <div className="flex-center flex-col dark:text-white">
                      <div className="flex-center w-[40px] h-[40px] comment-bg rounded-full  text-xl">
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </div>
                      <h3 className="text-md font-bold">Add Photos/Videos</h3>
                      <span className="font-thin text-[12px]">or drag and drop</span>
                  </div>
              </div>
            }

            <ShowImages images={images}/>
              

             {  editImages && <EditImages handlerImagesDetail={handlerDetailImage} dataFile={dataFile} data={images} deleteImage={handleImageRemove} hideEdit={handleHideEdit}/> }
    </div>
   )
}

export default AddImages