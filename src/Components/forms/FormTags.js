/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowLeft, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector } from "react-redux"
import IgnoreDynamic from "../navigation/ignore_dynamic"
import { useState, useEffect } from "react"

const FormTags = ({data, show, newData}) => {

  const { user } = useSelector(state => ({ ...state }))

  const [ suggestions, setSuggestions ] = useState([])
  const [ taggsed, setTaggsed ] = useState([])
  const [ keywords, setKeywords ] = useState("")

  useEffect(() => {
    setSuggestions(user.friends.filter(friend => friend?._id !== data[0]?._id))
  }, [user, data])

  useEffect(() => {
    setTaggsed(data)
  },[data])


  const handlerSearchFriends = (value) => {
    setKeywords(value)
    let newArr =  user.friends.filter(friend => friend.username.toLowerCase().includes(value.toLowerCase()))
    if ( taggsed?.length > 0 ) {
      newArr = newArr.filter(newUser => taggsed.some(tag => tag._id !== newUser._id))
    }
    setSuggestions(newArr)
  }

  const addTags = (friend) => {
    setTaggsed([...taggsed, friend])
    setSuggestions(suggestions.filter(suggest => suggest._id !== friend._id))
  }

  const removeTags = (friend) => {
    setTaggsed(taggsed.filter(tag => tag._id !== friend._id))
    setSuggestions([...suggestions, friend])
  }

  const handlerHideForm = () => {
    show()
  }

  const handlerSubmitTags = () => {
    newData(taggsed)
    show()
  }

  return (
    <div className="fixed inset-0 z-50 flex-center">
       <div className="w-[550px] min-h-[500px] max-h-[1000px] secondary-bg b-full border border-gray-400 rounded-lg pb-4">
        <div className="h-[65px] dark:text-white flex-center relative b-bottom border-b border-gray-300">
              <h4 className="font-bold text-xl">Tag people</h4>
              <div onClick={handlerHideForm} className="absolute primary-text w-[40px] h-[40px] flex-center left-[20px] hover-dark text-2xl primary-bg cursor-pointer rounded-full ">
                  <FontAwesomeIcon icon={faArrowLeft} />
              </div>
          </div> 
          <div className="flex p-4 items-center">
              <div className='flex-1 px-3 h-10 rounded-3xl comment-bg text-gray-600 max-lg:w-10 flex overflow-hidden items-center boxSearch'>
                  <FontAwesomeIcon className='dark:text-white' icon={faSearch}/> 
                  <input onChange={e=> handlerSearchFriends(e.target.value)} value={keywords} className='inputSearch outline-none flex-1 ml-2 dark:text-white dark:placeholder:text-gray-400 placeholder:text-gray-700 text-md comment-bg' type="text" placeholder="Search for friends"/>
              </div>  
              <button onClick={handlerSubmitTags} className="px-5 text-blue-500 font-medium text-lg">Done</button>
          </div>  
          <div className="px-4 font-medium text-sm">
              { taggsed?.length > 0 &&
                 <div className="mb-2">
                    <h3 className="mb-3">TAGGSED</h3>
                    <div className="w-full max-h-[200px] b-full p-2 border border-gray-400 flex items-center flex-wrap overflow-y-scroll">
                          {
                            taggsed?.map((tag, i) => (
                               <div key={i} className="h-full flex items-center mr-2 px-3 py-2 bg-blue-500 text-blue-300 bg-opacity-30 mb-2 rounded-xl">
                                   <span>{tag.username}</span>
                                   <div onClick={e => removeTags(tag)} className="w-[25px] h-[25px] rounded-full flex-center cart-hover ml-3 text-xl cursor-pointer">
                                     <FontAwesomeIcon icon={faXmark}/>
                                   </div>
                               </div>
                            ))
                          }
                    </div>
                 </div>
              }
              <h3 className="mb-3">SUGGESTIONS</h3>
              <div className="overflow-y-scroll custom_scroll">
                {
                  suggestions.map((friend, i) => (
                    <IgnoreDynamic onClick={e => addTags(friend)} key={i} text={friend.username} image={friend.avatar} />
                  ))
                }
              </div>
          </div>
       </div>
    </div>
  )
}

export default FormTags