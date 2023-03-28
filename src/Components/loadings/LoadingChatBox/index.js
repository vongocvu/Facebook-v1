import classNames from "classnames/bind"

import styles from "./loadingChatBox.module.scss"

const cx = classNames.bind(styles)

const LoadingChatBox = () => {
  return (
    <div className={cx('absolute inset-0 z-50 flex items-center justify-center dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40', 'wrapper')}>
         <div className={cx('loading_chat_box' ,'dark:border-white dark:border-b-transparent')}></div>
    </div>
  )
}


export default LoadingChatBox