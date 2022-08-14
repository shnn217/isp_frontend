import {
  BrowserRouter as Router,
  Outlet,
  useLocation,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import portal from "../style/layout/Portal.module.scss"; //JSON
import Logo from "../resource/SVG/Logo";
import Header from "../layout/header";
import Modal from './component/Modal'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-80);

function Portal({ user, setUser ,setModal,modal}) {
  const container = useRef(null);
  const navigate = useNavigate();
 
  const location = useLocation();
  const hand = () => {
    if (user.name.length > 1) {
      setUser({ ...user, name: "" });
    } else {
      setUser({ ...user, name: "Eric" });
    }
  };

  function top() {
    scrollToRef(container)
  }

  useEffect(() => {
    top();
  }, [location]);

  return (
    <div className={portal.body}   ref={container} >
      {location.pathname.toLowerCase().includes("login") ? null : (
        <Header user={user} setUser={setUser} />
      )}
      <Modal modal={modal} setModal={setModal}/>
      <div
     
        className={
          location.pathname.toLowerCase().includes("login")
            ? portal.Logincontent
            : portal.content
        }
      >
        {/* <button  className='btn btn-primary' onClick={hand}>{user.name.length>1?"Logout":"Login"}</button> */}
        <CheckPoint user={user} setUser={setUser}/>
      </div>
    </div>
  );
}

export default Portal;

//這個新增的component來檢查,是否有登入過
//假如在"/Loging" 下面的domain都可以非登入狀態進出
function CheckPoint({ user,modal ,setModal }) {
  const location = useLocation();
  //假如是"/login" or "/login/..."都可以自由進出
  if (!location.pathname.toLowerCase().includes("login")) {
    //檢查登入
    if (user.user > 0) {
      return <Outlet user={user} />;
    } else {
      return <Navigate to={"/login"} />;
    }
  } else {
    return <Outlet user={user} />;
  }
}
