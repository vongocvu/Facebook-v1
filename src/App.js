/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import IsLoggedIn from "./routers/IsLoggedIn";
import ChangeTheme from "./Components/chatRoom/settings/ChangeTheme";
import ChangeNickname from "./Components/chatRoom/settings/ChangeNickname";
import Profile from "./Components/profile";
import DetailPost from "./Components/posts/detailPost";
import ChatWindow from "./Components/chatWindow";
import SignUp from "./Components/SignUp";
import DetaiPhotoComment from "./Components/viewDetailPhoto/DetailPhotoComment";
import DetailPhotoMessenger from "./Components/viewDetailPhoto/DetailPhotoMessenger";

function App() { 

  return (
      <Routes>
        <Route element={<IsLoggedIn/>}>
           <Route path="/" element={<Home/>}>
              <Route path="/setting/changetheme/:typeGroup/:idGroup"  element={<ChangeTheme/>}/>
              <Route path="/setting/changenickname/:typeGroup/:idGroup" element={<ChangeNickname/>}/>
              <Route path="/post/detail/:id" element={<DetailPost/>}/> 
              <Route path="/detail_photos_comment/:idComment" element={<DetaiPhotoComment/>}/>
              <Route path="/detail_photos_message/:idMessage" element={<DetailPhotoMessenger/>}/>
              <Route path="/message/:id" element={<ChatWindow/>}/>
           </Route>
           <Route path="/profile/:idUser" element={<Profile/>}/>
           <Route path="/watch" element={<Home/>}/>
        </Route>
        <Route path="/login" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
  );
}

export default App;
