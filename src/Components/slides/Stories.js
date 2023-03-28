import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Slider from "react-slick";

import styles from "./stories.module.scss";

const cx = classNames.bind(styles);

const Stories = ( { Store }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 4.5,
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
        <div className={cx("flex card cursor-pointer relative overflow-hidden rounded-xl h-full px-1 hover:opacity-90 ")}>
              <div className={cx("overflow-hidden rounded-xl")}>
                <img className={cx("card-img", 'h-full object-fill')} src="https://static-images.vnncdn.net/files/publish/2022/9/3/bien-vo-cuc-thai-binh-346.jpeg" alt="1212" />
                <div className="h-full">
                  <div className={cx("w-full absolute text-nowrap bottom-[0px] py-[20px] right-2/4 translate-x-2/4 text-center text-black text-md font-medium bg-white border")}>
                    Create story
                  </div>
                    <div className={cx('absolute bg-blue-600 w-10 h-10 bottom-[45px] right-2/4 translate-x-2/4 flex items-center justify-center text-white rounded-full border-4 border-white')}>
                          <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
              </div>
            </div>
          {Store.map((story, index) => (
            <div key={index} className={cx("card cursor-pointer relative rounded-xl hover:opacity-90 px-1 h-full")}>
              <div className={cx("overflow-hidden rounded-xl")}>
                <img className={cx("card-img h-full")} src={story.img} alt="1212" />
                <div className={cx("h-full")}>
                  <div className={cx("w-10 h-10 rounded-full overflow-hidden absolute top-5 left-5 border-4 border-blue-500")} >
                      <img src={story.avatar}  alt="avatar"/>
                  </div>
                  <div className={cx("w-full absolute bottom-3 text-nowrap right-2/4 translate-x-2/4 text-center text-white text-md font-medium")}>{story.author}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
  );
};

export default Stories
