const ShowImages = ({images}) => {
    return (
       <div>
          {
                  images.length === 1 && 
                  <div className="w-full h-[300px]">
                       <img className="w-full h-full object-contain" src={images[0].url} alt="anh"/>
                  </div>
              }

              {
                  images.length === 2 && 
                  <div className="w-full h-[300px] flex rounded-lg overflow-hidden">
                       <img className="w-2/4 h-full object-contain mr-[1px]" src={images[0].url} alt="anh"/>
                       <img className="w-2/4 h-full object-contain ml-[1px]" src={images[1].url} alt="anh"/>
                  </div>
              }

              {
                  images.length === 3 && 
                  <div className="w-full h-[350px] flex rounded-lg overflow-hidden">
                       <img className="w-[60%] h-full object-cover mr-[2px]" src={images[0].url} alt="anh"/>
                       <div className="w-[40%] h-full flex flex-col">
                          <img className="w-full h-[50%] object-cover mb-[1px]" src={images[1].url} alt="anh"/>  
                          <img className="w-full h-[50%] object-cover mt-[1px]" src={images[2].url} alt="anh"/>  
                       </div>
                  </div>
              }

              {
                  images.length === 4 && 
                  <div className="w-full h-[350px] flex rounded-lg overflow-hidden">
                       <img className="w-[60%] h-full object-cover mr-[2px]" src={images[0].url} alt="anh"/>
                       <div className="w-[40%] h-full flex flex-col">
                          <img className="w-full h-[33%] object-cover " src={images[1].url} alt="anh"/>  
                          <img className="w-full h-[33%] object-cover mt-[2px]" src={images[2].url} alt="anh"/>  
                          <img className="w-full h-[33%] object-cover mt-[2px]" src={images[3].url} alt="anh"/>  
                       </div>
                  </div>
              }

              {
                  images.length > 4 && 
                  <div className="w-full h-[350px] flex rounded-lg overflow-hidden">
                       <img className="w-[60%] h-full object-cover mr-[2px]" src={images[0].url} alt="anh"/>
                       <div className="w-[40%] h-full flex flex-col">
                          <img className="w-full h-[33%] object-cover " src={images[1].url} alt="anh"/>  
                          <img className="w-full h-[33%] object-cover mt-[2px]" src={images[2].url} alt="anh"/>  
                          <div className="w-full h-[33%] mt-[2px] relative">
                             <img className="w-full h-full object-cover" src={images[3].url} alt="anh"/>  
                             <div className="w-full h-full absolute inset-0 bg-black bg-opacity-40 flex-center">
                                 <span className="text-white text-3xl">+{images.length - 3}</span>
                             </div>
                          </div>
                       </div>
                  </div>
              }
       </div>
    )
}

export default ShowImages