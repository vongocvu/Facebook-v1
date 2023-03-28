import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'

import ShowTabName from '../../tooltip'


import styles from './ignore_nav.module.scss'

const cx = classNames.bind(styles)



const IgnoreNav = ({ icon, to, tab_name }) => {

      const location = useLocation();

   return (
            <ShowTabName tabName={tab_name} className={cx('h-full dark:text-white','nav_bar_header')}>
                  <NavLink to={to} className={cx('flex items-center justify-center h-full mx-1', `${location.pathname === '/' && to === '/' ? 'active' : ''}`)}>
                        <div className={cx('flex items-center justify-center hover-dark hover:bg-gray-100 px-10 rounded-lg text-xl', 'child_nav')}>{icon}</div>
                  </NavLink>
            </ShowTabName>
   )
}

export default IgnoreNav