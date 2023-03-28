import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"


const FormVerify = () => {
      const dispatch = useDispatch()


      const handlerLeave = () => {
        dispatch({
            type: "LEAVE"
        })
      }

      const handlerNotLeave = () => {
        dispatch({
            type: "NOT-LEAVE"
        })
      }

    return (
      <div className="fixed inset-0 flex-center z-50 bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30">
          <div className="w-[600px] rounded-lg secondary-bg bg-white p-3 primary-text">
               <div className="flex justify-between b-bottom mb-3 pb-3 ">
                 <span className="text-2xl font-bold">Leave Page?</span>
                 <div onClick={handlerNotLeave} className="w-[40px] h-[40px] flex-center comment-bg rounded-full hover:opacity-80 cursor-pointer"><FontAwesomeIcon icon={faXmark}/></div>
               </div>
               <h3>You have unsaved changes that will be lost if you leave the page.</h3>
               <div className="flex justify-end mt-4">
                <button onClick={handlerNotLeave} className="text-blue-500 px-4 py-3 hover-dark rounded-lg">Keep Editing</button>
                <button onClick={handlerLeave} className="dark:text-white font-medium bg-blue-500 px-10 text-xl ml-3 py-1 hover:opacity-80 rounded-lg">Leave</button>
               </div>
          </div>
      </div>
    )
}


export default FormVerify
