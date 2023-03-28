import MessageForMe from "../message/messageForMe";
import MessageForYou from "../message/messageForYou";



const HandlerShowMessage = ({chatList, data, user}) => {

  const checkNickName = (sender) => {
    let nickname = "";
    data.members.forEach((member) => {
      if (member.user === sender) {
        if (member.nickname !== "") {
          return (nickname = member.nickname);
        }
      }
    });
    return nickname;
  };


    return (
      <>
        {chatList?.map((messages, index) =>
            messages.event ? (
              <div key={index} className="w-full my-4 flex justify-center">
                <div className="w-[60%] text-center text-xs dark:text-gray-300 text-gray-700">
                  {`${messages.sender.username} ${messages.content}`}
                </div>
              </div>
            ) : messages.sender._id === user._id ? (
              <MessageForMe
                idGroup={data._id}
                key={index}
                message={messages}
                theme={data.theme}
                realTimes={messages.createdAt ? "" : new Date()}
              />
            ) : chatList[index - 1]?.sender._id !== messages.sender._id &&
              chatList[index + 1]?.sender._id !== messages.sender._id ? (
              MessageForYou.oneMessage(
                messages,
                messages.sender,
                index,
                messages.createdAt ? "" : new Date(),
                "group",
                checkNickName(messages.sender._id)
              )
            ) : chatList[index - 1]?.sender._id !== messages.sender._id &&
              chatList[index + 1]?.sender._id === messages.sender._id ? (
              MessageForYou.firstMessage(
                messages,
                messages.sender,
                index,
                messages.createdAt ? "" : new Date(),
                "group",
                checkNickName(messages.sender._id)
              )
            ) : chatList[index - 1]?.sender._id === messages.sender._id &&
              chatList[index + 1]?.sender._id === messages.sender._id &&
              chatList[index + 1]?.event === true &&
              chatList[index - 1]?.event === true ? (
              MessageForYou.oneMessage(
                messages,
                messages.sender,
                index,
                messages.createdAt ? "" : new Date(),
                chatList[index + 1]
              )
            ) : chatList[index - 1]?.sender._id === messages.sender._id &&
              chatList[index + 1]?.sender._id === messages.sender._id ? (
              MessageForYou.middleMessage(
                messages,
                messages.sender,
                index,
                messages.createdAt ? "" : new Date()
              )
            ) : (
              chatList[index - 1]?.sender._id === messages.sender._id &&
              chatList[index + 1]?.sender._id !== messages.sender._id &&
              MessageForYou.lastMessage(
                messages,
                messages.sender,
                index,
                messages.createdAt ? "" : new Date()
              )
            )
          )}
      </>
    )
}

export default HandlerShowMessage