import {
  BrowserRouter as Router,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import { useState,useEffect } from "react";
import portal from "../style/layout/Portal.module.scss";//JSON
import Logo from "../resource/SVG/Logo";
import Header from '../layout/header'
function Portal({user,setUser}) {
   
   const navigate = useNavigate()
   const location = useLocation()
   const hand = () =>{
      if(user.name.length>1){
         setUser({...user,name:''})
      }else{
         setUser({...user,name:'Eric'})
      }
   }

   
  return (
    <div className={portal.body}>
      {location.pathname.toLowerCase().includes('login')?null:<Header user={user} setUser={setUser}/>}
      <div className={location.pathname.toLowerCase().includes('login')?portal.Logincontent:portal.content}>
         {/* <button  className='btn btn-primary' onClick={hand}>{user.name.length>1?"Logout":"Login"}</button> */}
        <CheckPoint user={user} setUser={setUser}/>
      </div>
    </div>
  );
}

export default Portal;

//這個新增的component來檢查,是否有登入過
//假如在"/Loging" 下面的domain都可以非登入狀態進出
function CheckPoint ({user}) {
  const location = useLocation();
  //假如是"/login" or "/login/..."都可以自由進出
  if(!location.pathname.toLowerCase().includes('login')){
    //檢查登入 
    if(user.name.length>0){
      return <Outlet user={user}/>
    }else{
      return <Navigate to={'/login'}/>
    }
  }else{
    return <Outlet user={user}/>
  }
}