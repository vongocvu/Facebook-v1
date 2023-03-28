
const FirstChat = ({avatar}) => {
  return (
    <div className="w-full flex justify-center flex-col items-center my-10">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-green-600">
             <img className="w-full h-full" src={avatar}  alt="avatar"/>
          </div>
          <div className="w-[70%] text-center mt-3 dark:text-gray-300 text-gray-700">
             <span>Let's send the first message to get to know each other!</span>
          </div>
    </div>
  )
}


export default FirstChat