/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
const ShowImagesPost = ({idPost}) => {

     const [ Data, setData ] = useState([])

     useEffect(() => {
          const getData = async () => {
              await axios.get(`https://sever-facebook-fake.vercel.app/v1/postDetail/getByPost/${idPost}`)
              .then(response => {
                setData(response.data)
              })
          }
          getData()
     },[])
    

    return (
       <div>
          {
                  Data.length === 1 && 
                  <div className="w-full">
                       <Link className="w-full" to={`/post/detail/${Data[0]._id}`} ><img className="w-full h-full object-contain" src={Data[0].image} alt="anh"/></Link>
                  </div>
              }

              {
                  Data.length === 2 && 
                  <div className="w-full flex max-h-[600px] overflow-hidden">
                       <Link className="w-2/4 min-h-full mr-[1px]" to={`/post/detail/${Data[0]._id}`} ><img className="w-full h-full object-cover" src={Data[0].image} alt="anh"/></Link>
                       <Link className="w-2/4 min-h-full ml-[1px]" to={`/post/detail/${Data[1]._id}`} ><img className="w-full h-full object-cover " src={Data[1].image} alt="anh"/></Link>
                  </div>
              }

              {
                  Data.length === 3 && 
                  <div className="w-full flex max-h-[600px] overflow-hidden">
                       <Link className="w-[60%]" to={`/post/detail/${Data[0]._id}`} ><img className="w-full h-full object-cover mr-[2px]" src={Data[0].image} alt="anh"/></Link>
                       <div className="w-[40%] mih-h-full flex flex-wrap">
                          <Link className="min-w-full min-h-2/4" to={`/post/detail/${Data[1]._id}`} ><img className="w-full h-full object-cover mb-[1px]" src={Data[1].image} alt="anh"/></Link>
                          <Link className="min-w-full min-h-2/4" to={`/post/detail/${Data[2]._id}`} ><img className="w-full h-full object-cover mt-[1px]" src={Data[2].image} alt="anh"/></Link>
                       </div>
                  </div>
              }

              {
                  Data.length === 4 && 
                  <div className="w-full flex max-h-[600px] overflow-hidden">
                       <Link className="w-full" to={`/post/detail/${Data[0]._id}`} ><img className="w-[60%] h-full object-cover mr-[2px]" src={Data[0].image} alt="anh"/></Link>
                       <div className="w-[40%] h-full flex flex-col">
                          <Link className="w-full h-[33.33333px]" to={`/post/detail/${Data[1]._id}`} ><img className="w-full h-full object-cover " src={Data[1].image} alt="anh"/>  </Link>
                          <Link className="w-full h-[33.33333px]" to={`/post/detail/${Data[2]._id}`} ><img className="w-full h-full object-cover mt-[2px]" src={Data[2].image} alt="anh"/></Link>
                          <Link className="w-full h-[33.33333px]" to={`/post/detail/${Data[3]._id}`} ><img className="w-full h-full object-cover mt-[2px]" src={Data[3].image} alt="anh"/></Link>
                       </div>
                  </div>
              }

              {
                  Data.length > 4 && 
                  <div className="w-full flex max-h-[600px] overflow-hidden">
                       <Link className="w-[60%] min-h-[100%] block mr-[2px]" to={`/post/detail/${Data[0]._id}`} ><img className="w-full h-full object-cover " src={Data[0].image} alt="anh"/></Link>
                       <div className="w-[40%]  flex flex-col justify-between">
                          <Link className="w-full h-[33%] block" to={`/post/detail/${Data[1]._id}`} ><img className="w-full h-full object-cover " src={Data[1].image} alt="anh"/>  </Link>
                          <Link className="w-full h-[33%] block" to={`/post/detail/${Data[2]._id}`} ><img className="w-full h-full object-cover " src={Data[2].image} alt="anh"/></Link>
                          <div className="w-full h-[33%] mt-[2px] relative">
                             <img className="w-full h-full object-cover" src={Data[3].image} alt="anh"/>  
                             <Link className="w-full h-full absolute inset-0 bg-black bg-opacity-40 flex-center block" to={`/post/detail/${Data[3]._id}`} >
                                  <span className="text-white text-3xl">+{Data.length - 3}</span>
                             </Link>
                          </div>
                       </div>
                  </div>
              }
       </div>
    )
}

export default ShowImagesPost