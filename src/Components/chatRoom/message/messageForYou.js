import ShowTabName from '../../tooltip'
import Moment from '../../moments'

const MessageForYou = {
   firstMessage: ( message, sender, key , realTimes , group, nickname) => {
      return (
        <div key={key} className="mb-[1px] mt-[20px]">
          <div className="text-center text-xs my-2 text-gray-800 dark:text-gray-300">{realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)}</div>
         {group && <div className="ml-[65px] text-xs text-black dark:text-white">{nickname !== "" ? nickname : sender.username}</div> }
            <div className="flex items-center max-w-[80%] px-2 mt-1">
              <div className="w-10 h-10 rounded-full mr-2"></div>
              <ShowTabName tabName={realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)} position = 'left' theme="light">
              <div className="bg-gray-200 px-3 py-2 rounded-l-xl rounded-r-2xl comment-bg dark:text-white text-over">
                {message.content} 
              </div>
              </ShowTabName>
          </div>
      </div>
      )
   },
   middleMessage: (message, sender, key, realTimes) => {
    return (
          <div key={key} className="flex items-center max-w-[80%] px-2">
            <div className="w-10 h-10 rounded-full mr-2"></div>
            <ShowTabName tabName={realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)} position = 'left' theme="light">
            <div className="bg-gray-200 px-3 py-2 rounded-l-xl rounded-r-2xl comment-bg dark:text-white text-over">
              {message.content}
            </div>
            </ShowTabName>
        </div>
    )
   },
   lastMessage: (message, sender, key, realTimes) => {
    return (
          <div  key={key} className="flex items-center max-w-[80%] px-2 mb-[20px]">
            <img className="w-10 h-10 rounded-full mr-2" src={sender.avatar} alt=""/>
            <ShowTabName tabName={realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)} position = 'left' theme="light">
            <div className="bg-gray-200 px-3 py-2 rounded-l-xl rounded-r-2xl comment-bg dark:text-white text-over">
              {message.content}
            </div>
            </ShowTabName>
        </div>
    )
   },
   oneMessage: (message, sender, key, realTimes, group, nickname ) => {
    return (
      <div key={key} className="mb-[20px] mt-[20px]">
        <div className="text-center text-xs my-2 text-gray-800 dark:text-gray-300">{realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)}</div>
       {group && <div className="ml-[65px] text-xs text-black dark:text-white">{nickname !== "" ? nickname : sender.username}</div> }
          <div className="flex items-center max-w-[80%] px-2 mt-1">
            <img className="w-10 h-10 rounded-full mr-2" src={sender.avatar} alt=""/>
            <ShowTabName tabName={realTimes !== "" ? Moment(realTimes) : Moment(message.createdAt)} position = 'left' theme="light">
            <div className="bg-gray-200 px-3 py-2 rounded-l-xl rounded-r-2xl comment-bg dark:text-white text-over">
              {message.content} 
            </div>
            </ShowTabName>
        </div>
    </div>
    )
   }
}

export default MessageForYou;
