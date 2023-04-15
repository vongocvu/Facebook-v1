/* eslint-disable react-hooks/exhaustive-deps */
import { faGear, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../logo";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";


import "./Stories.scss";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingChatBox from '../loadings/LoadingChatBox'

const Stories = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const { idStorie } = useParams()
  const [ Storie, setStorie ] = useState({});
  const [ AllStorie, setAllStorie ] = useState([]);
  const [ loading, setLoading ] = useState(false)

  const imageRef = useRef(null)

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true)
       const req1 = await axios.get(`${process.env.REACT_APP_API}/v1/storie/getOneStorie/${idStorie}`)
       const req2 = await axios.get(`${process.env.REACT_APP_API}/v1/storie/getStorie/${user._id}`)
       const [response1, response2] = await axios.all([req1, req2]);
        setStorie(response1.data)
        setAllStorie(response2.data)
        setLoading(false)
    }
    fecthData()
  }, [idStorie])


  const handleOutCreateStory = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 sm:z-[1] md:z-[55]">
      <div className="w-full h-screen grid grid-cols-10 ">
        <div className="sm:hidden md:block md:col-span-4 lg:col-span-3 xl:col-span-2 h-full secondary-bg bg-gray-100 px-3 b-full flex flex-col">
          <div className="flex h-[60px] items-center">
            <div
              onClick={handleOutCreateStory}
              className="w-[40px] h-[40px] flex-center primary-bg rounded-full mr-2 cart-hover cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="primary-text text-2xl"
              />
            </div>
            <Logo />
          </div>
          <div className="flex justify-between primary-text mt-5">
            <h3 className="text-2xl font-bold">Your story</h3>
            <div className="w-[40px] h-[40px] flex-center cart-bg rounded-full">
              <FontAwesomeIcon icon={faGear} className="text-xl" />
            </div>
          </div>
          <Link to={'/stories/create'} className="flex items-center my-4 cursor-pointer">
            <div className="w-[60px] h-[60px] b-full rounded-full flex-center dark:text-white">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="ml-3 primary-text font-bold">
              <h3>Create a story</h3>
              <h3 className="text-sm font-thin">Share a phot or wirite somethings.</h3>
            </div>
          </Link>
          <div className="flex-1 overflow-y-scroll custom_scroll">
             <h3 className="text-xl font-medium dark:text-white mb-4">All stories</h3>
             {
              AllStorie?.map((story, index) => (
                  <Link key={index} to={`/storie/detail/${story?._id}`} className="flex items-center cursor-pointer cart-hover px-3 py-2 rounded-lg">
                  <div className="w-[50px] h-[50px] b-full rounded-full flex-center dark:text-white">
                    <img className="w-full h-full object-cover rounded-full" src={story?.author.avatar} alt={"story_iamge"}/>
                  </div>
                  <div className="ml-3 primary-text font-medium">
                    <h3>{story?.author.username}</h3>
                    <h3 className="text-sm font-thin opacity-60">11 minutes ago</h3>
                  </div>
                </Link>
              ))
             }
          </div>  
        
        </div>

        <div className="sm:col-span-10 sm:h-screen md:col-span-6 lg:col-span-7 xl:col-span-8 h-full primary-bg flex-center bg-black">
               <div ref={imageRef} className="w-[550px] h-[890px] relative overflow-hidden flex-center">
                {
                  loading && <LoadingChatBox/>
                }
                   <img className="w-full h-full object-cove rounded-lg" src={Storie?.image} alt="storie" />
                   <div className="absolute top-[10px] left-[10px] flex items-center">
                       <img className="w-[60px] h-[60px] rounded-full"  src={Storie?.author?.avatar} alt="author" />
                       <span className="text-white font-medium text-xl ml-3">{Storie?.author?.username}</span>
                   </div>
                   {
                    Storie?.text?.map((text, i) => (
                      <TextareaAutosize
                        key={i}
                        minRows={1}
                        maxRows={100}
                        maxLength={200}
                        value={text.content}
                        readOnly
                        style={{ 'userSelect': 'none', 'fontFamily': `${text.fontFamily}`,
                        'color':`${text.color}`, 'position': 'absolute', 'top': `${text.top}%`, 'lineHeight': `50px`,
                         'left': `${text.left}%`, 'fontSize': `${text.fontSize * (parseInt(imageRef.current.getBoundingClientRect().height) / 100)}%`}} 
                        className={`select-none w-full text-center bg-transparent outline-none  resize-none`}
                        />
                    ))
                   }
               </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
