import classNames from "classnames/bind"
import { Link } from "react-router-dom"

import ShowTabName from '../../tooltip'

import styles from './ingnore_circle.module.scss'

const cx  = classNames.bind(styles)

const IgnoreCircle = ({ svg = false, image = false, to, tab_name, onClick }) => {
      const TagName = onClick ? 'div' : Link
     
      if (svg) {
            return (
                  <ShowTabName className="cursor-pointer" tabName={tab_name} onClick={onClick}>
                     <TagName to={to} className="rounded-full overflow-hidden w-10 mx-1 rouded-full comment-bg dark:text-white bg-gray-200 hover:bg-gray-300 w-10 h-10 flex items-center justify-center">
                        <div>{svg}</div>
                     </TagName>
                  </ShowTabName>
            )
      }

   return (
      <TagName className={cx("rounded-full overflow-hidden w-10 h-10 mx-1 cursor-pointer")} onClick={onClick}>
         <ShowTabName tabName={tab_name}>
            <img className="w-full h-full" src={image} alt="Images"/>
        </ShowTabName>
      </TagName>
   )
}

export default IgnoreCircle