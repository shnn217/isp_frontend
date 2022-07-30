import {
  BrowserRouter as Router,
  Outlet,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import { useState } from "react";
import portal from "../style/layout/Portal.module.scss";//JSON
import Logo from "../resource/SVG/Logo";
import Header from '../layout/header'
function Portal() {
   const [user,setUser]= useState({name:'',img:''})
   const navigate = useNavigate()
   const hand = () =>{
      if(user.name.length>1){
         setUser({...user,name:''})
      }else{
         setUser({...user,name:'Eric'})
      }
     
   }
  return (
    <div className={portal.body}>
      <Header user={user} setUser={setUser}/>
      <div className={portal.content}>
         {/* <button  className='btn btn-primary' onClick={hand}>{user.name.length>1?"Logout":"Login"}</button> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Portal;
