/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import IsLoggedIn from "./routers/IsLoggedIn";
import ChangeTheme from "./Components/chatRoom/settings/ChangeTheme";
import ChangeNickname from "./Components/chatRoom/settings/ChangeNickname";
import Profile from "./Components/profile";
import DetailPost from "./Components/detailPost";
import ChatWindow from "./Components/chatWindow";

function App() { 

  return (
      <Routes>
        <Route element={<IsLoggedIn/>}>
           <Route path="/" element={<Home/>}>
              <Route path="/setting/changetheme/:typeGroup/:idGroup"  element={<ChangeTheme/>}/>
              <Route path="/setting/changenickname/:typeGroup/:idGroup" element={<ChangeNickname/>}/>
              <Route path="/post/detail/:id" element={<DetailPost/>}/> 
              <Route path="/message/:id" element={<ChatWindow/>}/>
           </Route>
           <Route path="/profile/:idUser" element={<Profile/>}/>
           <Route path="/watch" element={<Home/>}/>
        </Route>
        <Route path="/login" element={<SignIn/>}/>
      </Routes>
  );
}

export default App;
