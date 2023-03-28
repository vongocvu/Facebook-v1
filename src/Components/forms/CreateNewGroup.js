/* eslint-disable react-hooks/exhaustive-deps */
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import io from "socket.io-client"
import Loading from '../loadings/LoadingChatBox'



import IgnoreDynamic from "../navigation/ignore_dynamic"
const CreateNewGroup = () => {

  const { user } = useSelector(state => ({...state}))
  const dispatch = useDispatch()

    const [ dataSuggested, setDataSuggested ] = useState([])
    const [ choosed, setChoosed ] = useState([])
    const [ inputSearch, setInputSearch ] = useState("")
    const [ nameGroup, setNameGroup ] = useState("")
    const [ loading, setLoading ] = useState(false)

    const inputRef = useRef(null);
    

    useEffect(() => {
        const findUser = async () => {
          await axios.get(`https://sever-facebook-fake.vercel.app/v1/auth/find/${inputSearch}`)
          .then(response => {
            setDataSuggested([...response.data.Users])
          })
        }
        inputSearch.length > 0 && findUser()
        inputSearch.length === 0 && setDataSuggested([])
    }, [inputSearch])

    const handlerChoose = (data) => {
        if (!choosed.some(choose => choose._id === data._id)) {
          setChoosed([...choosed, data])
          setInputSearch("")
          inputRef.current?.focus()
        }
      }

    const handlerDelete = (choose) => {
      setChoosed(choosed.filter((data) => data._id !== choose._id))
    }

    const handlerSubmit = async () => {
      setLoading(true)
        const idUsers = []

        choosed.forEach((data) => {
          idUsers.push({user: data._id, nickname: ""})
        })
        try {
          await axios.post(`https://sever-facebook-fake.vercel.app/v1/groupPublic/add`, {
             name: nameGroup,
             typeGroup: 2,
             owner: user._id,
             members: [
              {user:user._id, nickname: ""}, 
              ...idUsers
            ],
          })

          .then(response => {
            io("https://sever-facebook-fake.vercel.app").emit('createGroup', "create Group is successfuly !")
            dispatch({
              type: 'ADD_ROOM',
              payload: response.data._id
            })
            dispatch({
              type: 'OFF',
            })
            setNameGroup("")
            setChoosed([])
            setLoading(false)
          })
        } catch (err) {
          setLoading(true)
        }
    }

    const cancelCreateGroup = (e) => {
      dispatch({
        type: 'OFF',
      })
      setNameGroup("")
      setChoosed([])
    }

    document.getElementById("Form-Contain")?.addEventListener('click', (e) => {
      if (!document.getElementById('Form-Create-Group').contains(e.target)) {
        dispatch({
          type: 'OFF',
        })
        setNameGroup("")
        setChoosed([])
      }
    })

  return (
    <div id="Form-Contain" className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black dark:bg-opacity-30 bg-white bg-opacity-30 ">
      
       <div tabIndex="0" id="Form-Create-Group" className="flex flex-col h-[450px] w-[350px] bg-white rounded-lg overflow-hidden border border-gray-300 dark:border-black primary-bg py-3 px-5 relative primary-bg  dark:text-white">
          { loading && <Loading/>}
        <div className="font-bold text-lg mb-2 flex items-center justify-between">
             Create new group
             <FontAwesomeIcon onClick={cancelCreateGroup} className="hover:text-red-600 cursor-pointer text-2xl" icon={faXmark}/>
          </div>
        <hr className="dark:border-black"/>
        <div className="p-2">
            <label>Name:</label>
            <input type="text" value={nameGroup} className="outline-0 pl-2 primary-bg " onChange={e => setNameGroup(e.target.value)}/>
        </div>
        <hr className="dark:border-black"/>
        <div className="p-2 flex items-center flex-wrap">
            <label>To: </label>
            {
                choosed.map((choose, index) => (
                      <div className="bg-gray-300 px-2 mx-[2px] flex items-center justify-between mb-1 dark:bg-gray-500" key={index}>
                          <span>{choose.username}</span> 
                          <FontAwesomeIcon className="hover:text-red-600 text-lg ml-2" icon={faXmark} onClick={() => handlerDelete(choose)}/>
                        </div>
                  )
                )
            }
            <input type="text" ref={inputRef} value={inputSearch} className="outline-0 pl-2 primary-bg " onChange={e=> setInputSearch(e.target.value)}/>
        </div>
        <hr className="dark:border-black"/>
        <div className="w-full flex-1 overflow-y-scroll custom_scroll my-2 px-2">
            {
              dataSuggested.map((data, index) => (
                data._id !== user._id && (
                  <IgnoreDynamic className="" key={index} image={data.avatar} text={data.username} id={data._id} onClick={() => handlerChoose(data)}/>
                )
              ))
            }
        </div>
        {
          nameGroup !== "" && choosed.length > 0 
          ? <button className="bg-blue-900 py-3 w-32 text-white rounded-lg hover:opacity-80 font-bold" onClick={handlerSubmit}>Create Group</button> 
          : ""
        }
        
       </div>
    </div>
  )
}

export default CreateNewGroup

