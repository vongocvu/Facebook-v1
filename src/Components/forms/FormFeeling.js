import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Feelings from "../data/feelings";

const FormFeeling = ({data, show, getData}) => {

  const handlerHideForm = () => {
    show()
  }

  const handlerFeeling = (newdata) => {
    newdata.name === data.name ? getData({}) : getData(newdata) 
    show()
  }
  return (
    <div className="fixed inset-0 z-50 flex-center">
      <div className="w-[550px] min-h-[500px] max-h-[1000px] secondary-bg b-full border border-gray-400 rounded-lg pb-4">
        <div className="h-[65px] dark:text-white flex-center relative b-bottom border-b border-gray-300">
          <h4 className="font-bold text-xl">How are you feeling?</h4>
          <div
          onClick={handlerHideForm}
            className="absolute primary-text w-[40px] h-[40px] flex-center left-[20px] hover-dark text-2xl primary-bg cursor-pointer rounded-full "
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </div>
        <div className="p-4 flex flex-col">
          <div className="border-b-[4px] border-blue-500 w-[100px] text-center pb-4 mb-2">
            <h3 className="text-lg font-medium text-blue-500">Feelings</h3>
          </div>
          <div className="flex-1 overflow-y-scroll flex flex-wrap custom_scroll">
                {
                  Feelings.map((feeling, i) => (
                    <div onClick={e => handlerFeeling(feeling)} key={i} className={`${data?.name === feeling.name && 'cart-bg'} w-[50%] flex px-4 py-2 items-center hover-dark cursor-pointer rounded-lg`}>
                      <div className="w-[40px] p-2 comment-bg rounded-full mr-3">
                        <img src={feeling.icon} alt="icon"/>
                      </div>
                      <div>{feeling.name}</div>
                    </div>
                  ))
                }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFeeling
