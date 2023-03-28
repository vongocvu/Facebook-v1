import classNames from 'classnames/bind'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Search.module.scss'

const cx = classNames.bind(styles)




const Search = () => {
      return (
            <div className={cx('px-3 h-10 border dark:border-gray-900 rounded-3xl comment-bg text-gray-600 max-lg:w-10 flex overflow-hidden items-center', 'boxSearch')}>
                 <FontAwesomeIcon className='dark:text-white' icon={faSearch}/>
                 <input className={cx('inputSearch', 'ml-2 dark:text-white dark:placeholder:text-white placeholder:text-gray-700 text-md comment-bg')} type="text" placeholder="Search Facebook"/>
            </div>
      )
}

export default Search