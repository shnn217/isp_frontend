import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import loginApi, { profileInfoApi } from "../api/loginApi";

const AfterLinkedinLogin = ({user, setUser}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username'); 
  
  useEffect(() => {
    console.log(username)
    loginApi({username:username})
      .then((res) => {
        profileInfoApi().then((respond) => {
          console.log(respond.data,typeof(respond));
          localStorage.setItem(
            "User",
            JSON.stringify(respond.data)
          );

          setUser({
            ...respond.data,
            profile_img: respond.data.profile_img!=="empty"?respond.data.profile_img:
                "https://i.pinimg.com/564x/e3/60/93/e3609311123e13852ee148788d955acb.jpg",
          });
          // return <Navigate to="/setting" replace={true} state={{ from: location }} />
          navigate("/setting", {replace: true});
          
        }).catch(() => {})
      }).catch(() => {});
  }, []);

  return <div></div>
};

export default AfterLinkedinLogin;

