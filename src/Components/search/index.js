import classNames from 'classnames/bind'
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Search.module.scss'
import { useEffect, useRef, useState } from 'react'
import Logo from "../logo"
import IgnoreDynamic from '../navigation/ignore_dynamic'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const cx = classNames.bind(styles)

const Search = () => {

      const navigate = useNavigate()

      const searchRef = useRef(null)
      const contentSearchRef = useRef(null)
      const [ showIcon, setShowIcon ] = useState(true)
      const [ data, setData ] = useState([])
      const [ keyWord, setKeyWord ] = useState("")

      useEffect(() => {
            searchRef?.current?.addEventListener('focus', () => {
                  setShowIcon(false)
            })

            window.addEventListener('click', (e) => {
                  if (!contentSearchRef?.current?.contains(e.target) && !searchRef?.current?.contains(e.target)) {
                        setShowIcon(true)
                        setKeyWord("")
                  }
            })
      })

      useEffect(() => {
            const getData = async () => {
                  keyWord !== "" && await axios.get(`${process.env.REACT_APP_API}/v1/auth/find/${keyWord}`)
                  .then(response => {
                        setData([...response.data.Users])
                  })
                  keyWord === "" && setData([])
            }
            getData()
      },[keyWord])

      const gotoLink = (link) => {
        setShowIcon(true)
        navigate(link)
      }

      return (
            <div className="w-[350px] flex items-center relative ">
             {showIcon  && <Logo/> }
             {!showIcon  &&  <div className='primary-text text-lg hover-dark rounded-full w-[40px] h-[40px] flex-center mr-2 cursor-pointer'><FontAwesomeIcon icon={faArrowLeft}/></div> }
                  <div className={cx('flex-1 px-3 h-10 border dark:border-gray-900 rounded-3xl comment-bg text-gray-600 max-lg:w-10 flex overflow-hidden items-center', 'boxSearch')}>
                        { showIcon && <FontAwesomeIcon className='dark:text-white' icon={faSearch}/> }
                        <input onChange={e => setKeyWord(e.target.value)} value={keyWord} ref={searchRef} className={cx('inputSearch', 'flex-1 ml-2 dark:text-white dark:placeholder:text-gray-400 placeholder:text-gray-700 text-md comment-bg')} type="text" placeholder="Search Facebook"/>
                        {!showIcon && 
                              <div ref={contentSearchRef} className="w-[110%] border b-full secondary-bg absolute left-[-10px] top-[55px] rounded-md">
                                  { data?.length === 0 &&   <h3 className="text-center py-4 primary-text text-lg">No recent searches</h3> }
                                  { data?.map((user, index) => (
                                    <IgnoreDynamic onClick={ e => gotoLink(`/profile/${user?._id}`)} search={user?._id} key={index} text={user?.username} image={user?.avatar} />
                                  ))}
                              </div>
                        }
                      
                 </div>    
            </div>
      )
}

export default Search