/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import { faCheck, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useState } from 'react'
import LoadingChatBox from '../../loadings/LoadingChatBox'
import classNames from 'classnames/bind'
import axios from 'axios'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'

import styles from './settings.module.scss'


const cx = classNames.bind(styles)

const ChangeNickname = () => {

  const { user } = useSelector(state => ({...state}))
   const navigate = useNavigate()
   const { typeGroup, idGroup } = useParams()

  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState([])
  const [ editor, setEditor ] = useState("")
  const [ input, setInput ] = useState('')


  const fatchData = async () => {
    await axios.get(`http://localhost:8000/v1/${typeGroup}/getOne/${idGroup}`)
    .then(response => {
      setData(response.data.group)
      setLoading(false)
    })
  }
  
  useEffect(() => {
        setLoading(true)
        fatchData()
  },[])


  const handlerCancelChangeTheme = async () => {
      navigate('/')
  }


  useEffect(() => {
    document.getElementById(`ChangeNickname${idGroup}`).addEventListener('click', (e) => {
        if (!document.getElementById(`ContentNickname${idGroup}`)?.contains(e.target)) {
           navigate('/')
        }
    })
  })


  useEffect(() => {
     document.getElementById(`inputRef${editor}`)?.focus()
    //  document.getElementById(`inputRef${editor}`)?.addEventListener('blur', () => {
    //     setEditor("")
    //  })
  },[editor])


  const handlerEditor = (id, e) => {
    setEditor(id)
    setInput('')
  }

  const submitChangeNickname = async (id) => {
    setLoading(true)
    await axios.post(`http://localhost:8000/v1/${typeGroup}/updateNickname/${idGroup}`, {
        idUser: id,
        newNickname: input
    })
    .then( async response => {

        let oldnickname = ""

        data.members.forEach( member => {
            if (member.user._id === id) {
               oldnickname = member.user.username
            }
        })

      io('http://localhost:8000').emit('message',{
              sender: {
                  _id: user._id,
                  avatar: user.avatar,
                  username: user.username
              },
              group: idGroup,
              content: `gave ${oldnickname} the nickname ${input} !`,
              event: true
            })
      
            await axios.post('http://localhost:8000/v1/message/add', {
              sender: user._id,
              content: `gave ${oldnickname} the nickname ${input} !`,
              group: idGroup,
              event: true
            })
      fatchData()
      setLoading(false)
      setEditor("")
    })
  }

  return (
    <div id={`ChangeNickname${idGroup}`} className="fixed inset-0 dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-40 z-50 flex items-center justify-center text-white">
    {loading && <LoadingChatBox/>}
      <div id={`ContentNickname${idGroup}`} className="w-[600px] border dark:border-black border-gray-300 secondary-bg text-black dark:text-white  bg-white rounded-lg">
           <div className="h-[60px] py-5 font-bold text-xl flex items-center justify-center relative">
               <span className="">Nicknames</span>
               <FontAwesomeIcon onClick={handlerCancelChangeTheme} className='absolute right-[20px] secondary-bg bg-gray-300 cursor-pointer hover-dark py-3 px-4 rounded-full' icon={faXmark}/>
           </div>
           <hr className="border dark:border-gray-900 border-gray-300"/>
           <div className="grid grid-cols-1 gap-3 p-5">
               {
                data.members?.map((member, index) => (
                  <div onClick={(e) => handlerEditor(member.user._id, e)} key={index} className={cx("w-full h-[50px]  cursor-pointer rounded-lg px-3", `${editor !== member.user._id && 'hover-dark hover:bg-gray-300'}`)}>
                      <div className="w-full h-full flex items-center">
                        <div className="h-[40px] w-[40px] mr-3 rounded-full overflow-hidden">
                          <img className="w-full h-full" src={member.user.avatar} alt='anhdaidien' />
                        </div>
                        <div className=" flex-1 h-full flex items-center justify-between">
                          { editor !== member.user._id && (
                            <>
                              <div>
                                  <h3 className="text-md font-medium leading-4 ">{member.user.username}</h3>
                                  <span className="text-sm font-thin leading-3"> {
                                      member.nickname !== ""  
                                       ?  <span key={index}>{member.nickname}</span>
                                       :  <span key={index}>Set Nickname</span>
                                  }</span>
                              </div>
                              <FontAwesomeIcon  icon={faPen}/>
                            </>
                          )}

                         { editor !== "" && editor === member.user._id && (
                            <>
                              <input 
                                  onChange={e => setInput(e.target.value)} 
                                  value={input}
                                  id={`inputRef${member.user._id}`} 
                                  className={cx("w-full h-[70%] comment-bg px-2")} 
                                  type="text"
                                  placeholder={
                                    member.nickname !== ""  
                                          ?  member.nickname
                                          :  member.user.username
                                  }
                              />
                              <FontAwesomeIcon onClick={() => submitChangeNickname(member.user._id)} className='w-[40px] h-[20px] dark:hover:bg-gray-700 hover:bg-gray-300 hover:text-green-600 ml-2 py-2 rounded-full' icon={faCheck}/>
                            </>
                          )}
                        </div>
                      </div>
                  </div>
                ))
               }
           </div>
      </div>
  </div>
  );
}

export default ChangeNickname;