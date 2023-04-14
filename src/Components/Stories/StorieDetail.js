/* eslint-disable react-hooks/exhaustive-deps */
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../logo";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";


import "./Stories.scss";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Stories = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const { idStorie } = useParams()
  const [ Storie, setStorie ] = useState({});

  const imageRef = useRef(null)

  useEffect(() => {
    const fecthData = async () => {
        await axios.get(`${process.env.REACT_APP_API}/v1/storie/getOneStorie/${idStorie}`)
        .then( res => {
          setStorie(res.data)
        })
    }
    fecthData()
  }, [])


  const handleOutCreateStory = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[55]">
      <div className="w-full h-screen grid grid-cols-10 ">
        <div className="col-span-2 h-full secondary-bg px-3 b-full flex flex-col">
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
          <div className="flex items-center my-4">
            <div className="w-[60px] h-[60px]">
              <img
                className="w-full h-full rounded-full"
                src={user?.avatar}
                alt={user.username}
              />
            </div>
            <div className="ml-3 primary-text font-bold">
              <h3>{user.username}</h3>
            </div>
          </div>
          <hr className="b-full" />
          <div className="flex-1"></div>
        </div>

        <div className="col-span-8 h-full primary-bg flex-center">
               <div ref={imageRef} className="w-[500px] h-[800px] relative b-full rounded-lg overflow-hidden">
                   <img className="w-full h-full object-contain" src={Storie?.image} alt="storie" />
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
