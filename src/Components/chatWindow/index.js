import { useParams } from "react-router-dom"


import ChatGlobal from "../ChatGlobal"
import ListChats from "../listChats"

const ChatWindow = () => {
    
  const { id } = useParams()
 
  return (
    <div className="fixed inset-0 pt-[60px] dark:bg-black bg-white z-20 flex">
         <div className=" max-md:hidden md:w-[40%] lg:w-[30%] xl:w-[20%]">
            <ListChats show={true} roomActive={id}/>
         </div>
         <ChatGlobal roomMessage={id} chatWindow={true} />
         <div className=" max-lg:hidden xl:w-[20%] bg-white secondary-bg b-left border-l border-gray-200">
         </div>
    </div>
  )
}

export default ChatWindow