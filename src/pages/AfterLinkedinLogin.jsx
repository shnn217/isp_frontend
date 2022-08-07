import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import loginApi from "../api/loginApi";

const AfterLinkedinLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username'); 
  useEffect(() => {
    console.log(username)
    loginApi({username:username})
      .then((res) => {
        console.log(res);
        navigate("/setting");
      })
      .catch(() => {});
  }, []);

  return <div></div>
};

export default AfterLinkedinLogin;

