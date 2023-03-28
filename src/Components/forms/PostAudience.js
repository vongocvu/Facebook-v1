import { faArrowLeft, faEarth, faUserFriends } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

const PostAudience = (props) => {

  const [ dataShare, setDataShare ] = useState(1)

   useEffect(() => {
       const choose_shares = document.querySelectorAll('.choose_share')

       choose_shares?.forEach((share) => {

           share.addEventListener('click', function () {
                this.lastChild.children[0].checked = true
                setDataShare(this.lastChild.children[0].value)
           })
       })
   })

   const handlerHideForm = () => {
      props.hiddenFormShare(props.oldData)
   }

   const handerSubmit = () => {
    props.hiddenFormShare(dataShare)
   }

   return (
    <div id="PostAudience" className="w-[600px] secondary-bg rounded-xl bg-white shadow-dark p-4 pt-0 shadow-md shadow-gray-400 overfow-hidden">
        <div className="h-[65px] dark:text-white flex-center relative b-bottom border-b border-gray-300">
                <h4 className="font-bold text-xl">Post Audience</h4>
                <div onClick={handlerHideForm} className="absolute primary-text w-[40px] h-[40px] flex-center left-[20px] hover-dark text-2xl primary-bg cursor-pointer rounded-full ">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
        </div> 

        <div className="primary-text">
            <h3 className="font-bold">Who can see your post?</h3>
            <span className="mt-2 mb-4 block text-sm opacity-70">Your post will show up in Feed, on your profile and in search results.</span>
            <span className="block text-sm opacity-70" >Your default audience is set to Public, but you can change the audience of this specific post.</span>
        </div>
        <div className="mt-2">
           <div className="flex items-center w-full h-[80px] p-2 hover-dark rounded-lg cursor-pointer choose_share">
               <div className="h-[60px] w-[60px] flex-center cart-bg rounded-full text-2xl dark:text-white">
                  <FontAwesomeIcon icon={faEarth} />
               </div>
               <div className="flex-1 px-2 dark:text-white">
                  <h3 className="font-bold">Public</h3>
                  <span className="text-sm opacity-70 font-thin">Any one on or off Facebook</span>
               </div>
               <div>
                  <input type="radio" name="PostAudience" value="1" defaultChecked={props.oldData === "1" && true} className="border-2 w-[20px] h-[20px] cursor-pointer"/>
               </div>
           </div>
           <div className="flex items-center w-full h-[80px] p-2 hover-dark rounded-lg cursor-pointer choose_share">
               <div className="h-[60px] w-[60px] flex-center cart-bg rounded-full text-2xl dark:text-white">
                  <FontAwesomeIcon icon={faUserFriends} />
               </div>
               <div className="flex-1 px-2 dark:text-white">
                  <h3 className="font-bold">Friends</h3>
                  <span className="text-sm opacity-70 font-thin">Your friends on Facebook</span>
               </div>
               <div>
                  <input type="radio" name="PostAudience" value="2"  defaultChecked={props.oldData === "2" && true} className="border-2 w-[20px] h-[20px] cursor-pointer"/>
               </div>
           </div>
        </div>
        <div className="flex justify-end">
           <button onClick={handlerHideForm} className="hover-dark px-5 mr-2 font-medium text-blue-500 rounded-lg">Cancel</button>
           <button onClick={handerSubmit} className="text-white font-medium px-10 py-2 rounded-lg bg-blue-500 hover:opacity-80">Done</button>
        </div>
        
    </div>
    
   )
}

export default PostAudience