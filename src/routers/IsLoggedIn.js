/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import SignIn from "../Components/SignIn"
import ChatGlobal from '../Components/ChatGlobal'
import CreateNewGroup from "../Components/forms/CreateNewGroup"
import FormVerify from "../Components/forms/formVerify"
const IsLoggedIn = () => {

  const { user, createGroup, verifyForm } = useSelector(state => ({...state}))

   return user 
      ? (
        <>
          <Outlet/>
          <ChatGlobal/>
          { verifyForm === 'verifyForm' && <FormVerify/> }
          { createGroup && <CreateNewGroup/> }
          </>
       )
      : <SignIn/>
}

export default IsLoggedIn