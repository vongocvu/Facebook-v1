/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import LoadingChatBox from '../../loadings/LoadingChatBox'
import axios from 'axios'

import io from 'socket.io-client'

import StoreColor from '../../data/storesColor'


const ChangeTheme = () => {

   const navigate = useNavigate()
   const { user } = useSelector(state => ({ ...state }))

  const { typeGroup, idGroup } = useParams()
  const [ choosedTheme, setChoosedTheme ] = useState("")
  const [ loading, setLoading ] = useState(false)

  const handlerChangTheme = (theme, event) => {
    document.querySelectorAll(`.messagethemes${idGroup}`).forEach(message => {
      message.style.backgroundImage = theme
    })

    setChoosedTheme(theme)

    document.querySelectorAll('.codeColor').forEach(code => {
      code.classList.remove('dark:bg-gray-700')
      code.classList.remove('bg-gray-300')
    })

    event.target.closest('.codeColor').classList.add('dark:bg-gray-700')
    event.target.closest('.codeColor').classList.add('bg-gray-300')

   const submitBtn =  document.getElementById('submitChangeTheme')
    submitBtn.disabled = false
    submitBtn.style.color = 'white' 
    submitBtn.style.backgroundColor = 'blue'
    submitBtn.classList.remove('cursor-not-allowed')

  }

  const handlerCancelChangeTheme = async () => {
    setLoading(true)
    await axios.get(`https://sever-facebook-fake.vercel.app/v1/${typeGroup}/getOne/${idGroup}`, {
      theme: choosedTheme
      })
      .then(response => {
      if (response) {
            document.querySelectorAll(`.messagethemes${idGroup}`).forEach(message => {
            message.style.backgroundImage = response.data.group.theme
      })
        setLoading(false)
        navigate('/')
      }
    })
  }

  const handlerSubmitChangeTheme = async () => {
     if (choosedTheme !== "") {
          setLoading(true)
         await axios.post(`https://sever-facebook-fake.vercel.app/v1/${typeGroup}/updateTheme/${idGroup}`, {
             theme: choosedTheme
         })
         .then(async response => {
          if (response) {
            io("https://sever-facebook-fake.vercel.app").emit('message',{
              sender: {
                  _id: user._id,
                  avatar: user.avatar,
                  username: user.username
              },
              group: idGroup,
              content: 'changed the theme for the group !',
              event: true
            })
      
            await axios.post(`https://sever-facebook-fake.vercel.app/v1/message/add`, {
              sender: user._id,
              content: 'changed the theme for the group !',
              group: idGroup,
              event: true
            })

           setLoading(false)
            navigate('/')
          }
       })
     }
  }

  useEffect(() => {
    document.getElementById(`changeTheme${idGroup}`).addEventListener('click', (e) => {
        if (!document.getElementById(`ContentTheme${idGroup}`)?.contains(e.target)) {
           handlerCancelChangeTheme()
         }
      })
  })

  return (
    <div id={`changeTheme${idGroup}`} className="fixed inset-0 dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-40 z-50 flex items-center justify-center text-white">
      {loading && <LoadingChatBox/>}
        <div id={`ContentTheme${idGroup}`} className="w-[420px] b-full border secondary-bg text-black dark:text-white bg-white rounded-lg">
             <div className="h-[60px] py-5 font-bold text-xl flex items-center justify-center relative">
                 <span className="">Themes</span>
                 <FontAwesomeIcon onClick={handlerCancelChangeTheme} className='absolute right-[20px] primary-bg hover-dark bg-gray-300 cursor-pointer py-3 px-4 rounded-full' icon={faXmark}/>
             </div>
             <hr className="b-full"/>
             <div className="grid grid-cols-6 gap-3 p-5">
                {
                  StoreColor.map((color, index) => (
                    <div onClick={(e) => handlerChangTheme(color, e)} key={index} className="col-span-1 cursor-pointer hover:bg-gray-300 hover:dark:bg-gray-700 w-[60px] h-[60px] flex items-center justify-center rounded-2xl codeColor">
                        <div className="w-[80%] h-[80%] rounded-full" code={color} style={{ 'backgroundImage': color}}></div>
                    </div>
                  ))
                }
             </div>
             <div className="p-5 flex justify-end">
               <button onClick={handlerCancelChangeTheme} className="px-3 py-2 ml-2 text-lg font-bold text-blue-600 hover:opacity-80">Cancel</button>
               <button onClick={handlerSubmitChangeTheme} id="submitChangeTheme" className="px-5 py-1 ml-2 primary-bg rounded-xl cursor-not-allowed text-gray-700 hover:opacity-80">Save</button>
             </div>
        </div>
    </div>
  )
}

export default ChangeTheme