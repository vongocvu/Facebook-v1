import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSelector, useDispatch } from "react-redux"

import './toggleTheme.scss'


const ToggleTheme = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector(state => ({...state}))
  document.body.classList.add(theme)

  theme === "light" && document.querySelector('.btnToggle')?.classList.add('darkTheme')
  theme === "dark" && document.querySelector('.container-toggle')?.classList.add('bg-white')

  const handlerToggleTheme = (e) => {
    document.body.classList.toggle('dark');
    localStorage.getItem('THEME')?.replace(/"/g, "") === "dark" ? localStorage.setItem('THEME', 'light') : localStorage.setItem('THEME', 'dark')
    e.target.closest('.toggle').lastChild.classList.toggle('darkTheme')
    e.target.closest('.toggle').classList.toggle("bg-white")
    dispatch({
      type: "TOGGLE_THEME"
    })
   }

  return (
    <div className='w-[80px] p-2 flex justify-between rounded-3xl cursor-pointer relative container-toggle toggle' onClick={handlerToggleTheme}>
       <FontAwesomeIcon className='text-pink-400 text-2xl' icon={faMoon}/>
       <FontAwesomeIcon className='text-yellow-500 text-2xl' icon={faSun}/>
       <div className='btnToggle'></div>
    </div>
  )
}

export default ToggleTheme