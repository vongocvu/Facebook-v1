import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import SignIn from '../Components/SignIn';
import ChatGlobal from '../Components/ChatGlobal';
import CreateNewGroup from '../Components/forms/CreateNewGroup';
import FormVerify from '../Components/forms/formVerify';
import CreateNewPost from '../Components/forms/CreateNewPost';
import { useMemo } from 'react';

const ChatGlobalMemo = React.memo(ChatGlobal);

const IsLoggedIn = () => {
  const { user, createGroup, verifyForm } = useSelector((state) => ({ ...state }));

  const Form = useMemo(() => {
    return (
      <>
        <CreateNewPost />
        {createGroup && <CreateNewGroup />}
        {verifyForm === 'verifyForm' && <FormVerify />}
      </>
    );
  }, [createGroup, verifyForm]);

  return user ? (
    <>
      <Outlet />
      {Form}
      <ChatGlobalMemo />
    </>
  ) : (
    <SignIn />
  );
};

export default IsLoggedIn;