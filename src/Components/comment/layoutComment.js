
const CommentLayout = ({ handlerCommenting, data}) => {

   const handerShowInput = (idComment, username) => {
    handlerCommenting(idComment, username)
   }

  return (
    <>
    { data && 
        <div className={`w-full mb-2`}>
          <div className="flex w-full max-w-[90%] ">
              <div className="min-w-[35px] max-w-[35px] h-[35px] ">
                <img className="w-full h-full rounded-full" src={data?.author?.avatar} alt="anhdaidien"/>
              </div>
              <div>
                  <div className="w-full ml-2 comment-bg bg-gray-200 px-4 pt-1 pb-3 rounded-xl">
                      <h3 className="font-bold hover:underline cursor-pointer text-sm primary-text">{data?.author?.username}</h3>
                      <h3 className="text-[15px] leading-5 primary-text">{data?.content}</h3>
                  </div>
                  <div className="ml-5 flex">
                    <div className="pr-4 text-xs primary-text hover:underline cursor-pointer relative">Like</div>
                    <div onClick={ e => {handerShowInput(data._id, data?.author?.username)}} className="pr-4 text-xs primary-text hover:underline cursor-pointer relative">Reply</div>
                    <div className="pr-4 text-xs primary-text hover:underline cursor-pointer relative">11m</div>
                  </div>
              </div>
          </div>
       </div>
    }

       </>
  )
}

export default CommentLayout