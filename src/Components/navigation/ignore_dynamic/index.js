import  { Link } from 'react-router-dom'
import classNames from "classnames/bind"
import { useSelector } from 'react-redux'

import styles from './ignore_dynamic.module.scss'

const cx = classNames.bind(styles)


const IgnoreDynamic = ({ ...props }) => {

      const { user } = useSelector(state => ({ ...state }))

      const { href, image = false, svg = false, text, to, onClick, idGroup, id, online, className, width, height, search } = props
      
      let Ignore = href ? 'a' : onClick ? 'div' : Link

      if (image) {
            return (
                  <Ignore className={cx('flex w-full items-center hover:bg-gray-200 p-2 dark:text-white text-gray-900 hover-dark rounded-md w-full cursor-pointer', 'Friend Group CreateGroup')} href={href} to={to} onClick={onClick} idgroup={idGroup} id={id}>
                      <div className={cx(' relative flex items-center', 'img')}>
                        <img className={cx('rounded-full object-cover w-[40px] h-[40px]')} src={image} alt={"ảnh đại diện"}/>
                        {
                              online && (
                                    <div className='absolute w-[10px] h-[10px] bottom-[5px] right-[10px] bg-black rounded-full flex items-center justify-center'>
                                          <span className='w-[7px] h-[7px] bg-green-500 rounded-full'></span>
                                    </div>
                              )
                        }
                      </div>
                      <div className='flex flex-col'>
                        <span>{text}</span>
                        {
                              user._id === search && <span className='opacity-70 text-xs'>You</span>
                        }

                        {
                              search && user._id !== search && user.friends.some(friend => friend._id === search) && <span className='opacity-70 text-xs'>Friend</span>
                        }
                  </div>
                  </Ignore>
            )
      }

      return (
            <Ignore className={cx('flex w-full items-center hover:bg-gray-200 p-2 dark:text-white hover-dark text-gray-800 rounded-md w-full cursor-pointer', 'Friend Group CreateGroup',`${width} ${height}`)} href={href} to={to} onClick={onClick} idgroup={idGroup} id={id}>
                  <div className={cx('rounded-full flex items-center justify-center w-10 h-10 text-2xl mr-2', `${className}` )}>
                        {svg}
                  </div>
                  <div className={cx('')}>{text}</div>
            </Ignore>
      )

}

export default IgnoreDynamic