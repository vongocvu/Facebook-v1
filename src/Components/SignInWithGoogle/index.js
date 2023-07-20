import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingChatBox from "../loadings/LoadingChatBox";


function GoogleButton() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "280516339093-tclm3hsqrkng44f0e542uug3mjiu02ji.apps.googleusercontent.com",
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

 const responseGoogle = async (response) => {
   setLoading(true)
          const { data } = await axios.post(
            `${process.env.REACT_APP_API}/v1/auth/loginGoogle`,
            {
              username: response.profileObj.name,
              email: response.profileObj.email,
              password: response.profileObj.googleId,
              avatar: response.profileObj.imageUrl
            }
          );
       
          if (data) {
            Cookies.set("CURENT_USER", JSON.stringify(data.user));
            Cookies.set("ACCESS_TOKEN", data.accessToken);
            Cookies.set("REFRESH_TOKEN", data.refreshToken);
            dispatch({ type: "LOGIN", payload: data.user });
            dispatch({ type: "RESET_USER_ONLINE" });
            setLoading(false)
            navigate("/");
          }

 };

 return (
   <>
   { loading &&  <LoadingChatBox/>}
       <GoogleLogin
         clientId="280516339093-tclm3hsqrkng44f0e542uug3mjiu02ji.apps.googleusercontent.com"
         buttonText="Đăng nhập bằng Google"
         onSuccess={responseGoogle}
         onFailure={responseGoogle}
         cookiePolicy={'single_host_origin'}
       />
    </>
 );
}


export default GoogleButton
