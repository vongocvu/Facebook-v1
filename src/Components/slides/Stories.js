/* eslint-disable react-hooks/exhaustive-deps */
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import TextareaAutosize from "react-textarea-autosize";


import styles from "./stories.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(styles);

const Stories = () => {


  const [ numberSlide, setNumberSlide ] = useState(5.5)
  const [ Store, setStore ] = useState([])
  const { user } = useSelector( state => ({ ...state}))

  const imageRef = useRef(null)


  useEffect(() => {
      const fecthData = async () => {
         await axios.get(`${process.env.REACT_APP_API}/v1/storie/getStorie/${user._id}`)
         .then( res => {
             setStore(res.data)
         })
      }

      fecthData()
  },[])

  useEffect(() => {
     window.addEventListener('resize', () => {
         window.innerWidth > 1024 && setNumberSlide(5.5)
         window.innerWidth < 1024 && window.innerWidth > 768 && setNumberSlide(4.5)
         window.innerWidth < 768 && setNumberSlide(3.5)
     })
  })
   
  const settings = {
    centerMode: false,
    centerPadding: 0,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: numberSlide,
    slidesToScroll: numberSlide - 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <button className={cx("slick-prev")} onClick={onClick}>
      </button>
    );
  }
  
  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <button className={cx("slick-next")} onClick={onClick}>
      </button>
    );
  }

  return (
        <Slider {...settings}>
        <Link to="/stories/create" className={cx("flex min-w-[120px] min-h-[190px] cursor-pointer relative overflow-hidden rounded-xl h-full px-1 hover:opacity-90 ")}>
              <div className={cx("min-w-[120px] h-[190px] overflow-hidden rounded-xl")}>
                <img className={cx("card-img", 'h-full object-cover')} src={user?.avatar} alt="1212" />
                <div className="h-full">
                  <div className={cx("w-full absolute text-nowrap bottom-[0px] py-[20px] right-2/4 translate-x-2/4 text-center text-black text-md font-medium bg-white border")}>
                    Create story
                  </div>
                    <div className={cx('absolute bg-blue-600 w-10 h-10 bottom-[45px] right-2/4 translate-x-2/4 flex items-center justify-center text-white rounded-full border-4 border-white')}>
                          <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
              </div>
            </Link>
          {Store?.map((story, index) => (
            <Link to={`/storie/detail/${story._id}`} key={index} className={cx("min-w-[120px] min-h-[190px] relative cursor-pointer relative rounded-xl hover:opacity-90 px-1 h-full")}>
              <div ref={imageRef} className="min-w-[120px] h-[190px] b-full rounded-lg overflow-hidden ">
                   <img className="object-cover w-full h-full" src={story?.image} alt="storie" />
                   {
                    story?.text?.map((text, i) => (
                      <TextareaAutosize
                        key={i}
                        minRows={1}
                        maxRows={100}
                        maxLength={200}
                        value={text.content}
                        readOnly
                        style={{ 'userSelect': 'none', 'fontFamily': `${text.fontFamily}`,
                        'color':`${text.color}`, 'position': 'absolute', 'top': `${text.top}%`, 'lineHeight': `10px`,
                         'left': `${text.left}%`, 'fontSize': `${text.fontSize * (parseInt(imageRef?.current?.getBoundingClientRect()?.height) / 100)}%`}} 
                        className={`select-none w-full cursor-pointer text-center bg-transparent outline-none  resize-none`}
                        />
                    ))
                   }
                   <div className="absolute w-[40px] h-[40px] top-[10px] left-[10px]">
                        <img className="rounded-full" src={story?.author?.avatar} alt={story?.author?.username} />
                   </div>
                   <div className="absolute font-medium text-white bottom-[10px] left-[10px]">
                        <span>{story?.author?.username}</span>
                   </div>
               </div>
            </Link>
          ))}
        </Slider>
  );
};

export default Stories
