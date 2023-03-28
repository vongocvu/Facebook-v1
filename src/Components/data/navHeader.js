import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faGamepad, faHome, faListDots, faMessage, faTv, faUsers } from "@fortawesome/free-solid-svg-icons"


const navHeader = {
  navMiddle: [
    {
      name: 'Home',
      icon:  <FontAwesomeIcon icon={faHome}/>,
      path: '/'
    },
    {
      name: 'Watch',
      icon:  <FontAwesomeIcon icon={faTv}/>,
      path: '/watch'
    },
    {
      name: 'Groups',
      icon:  <FontAwesomeIcon icon={faUsers}/>,
      path: '/groups'
    },
    {
      name: 'Game',
      icon:  <FontAwesomeIcon icon={faGamepad}/>,
      path: '/games'
    }
  ],
  
  navRight: [
    {
      name: 'Menu',
      icon:  <FontAwesomeIcon icon={faListDots}/>,
      path: '/' 
    },
    {
      name: 'Messenger',
      icon:  <FontAwesomeIcon icon={faMessage}/>,
      path: '/' 
    },
    {
      name: 'Notifications',
      icon:  <FontAwesomeIcon icon={faBell}/>,
      path: '/' 
    }
  ]
}


export default navHeader