import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Portal from "./pages/Portal";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profie";
import Setting from './pages/Setting'
import Topics from './pages/Topics';
import TopicsList from "./pages/component/TopicList";
import TopicView from "./pages/component/TopicView";
import SearchProfile from './pages/SearchProfile'
import AfterLinkedinLogin from "./pages/AfterLinkedinLogin";
import FAQ from './pages/FAQ'
import "./style/Global.scss";

export default function Routing() {
  let UserInfo = localStorage.getItem("User");
  const [user, setUser] = useState(
    UserInfo ? JSON.parse(UserInfo) : { first_name: "" }
  );
  // 在這邊設定好
  // 然後往下傳給portal,讓每個page都可以共用同一個
  // <Portal user={user} serUser={setUser} modal={modal} setModal={setModal}/>
  // 每一個獨立頁面也要拿到這個props , 這樣他們想要用的時候都可以用
  // <Signup user={user} serUser={setUser} modal={modal} setModal={setModal}/>
  const [modal, setModal] = useState({
    // 打開與否
    open: false,
    // 對話筐的大標題
    title: "",
    // 對話筐內文
    msg: "",
    // 按完click後要做什麼
    todo: () => {}
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal user={user} setUser={setUser} modal={modal} setModal={setModal}/>}>
          <Route index element={<Home user={user} />} />
          <Route  path={"Setting"} element={<Setting user={user} setUser={setUser} />} />
          <Route path={"login"}>
            <Route index element={<Login setUser={setUser} setModal={setModal}/>} />
            <Route path="after_linkedin" element={<AfterLinkedinLogin user={user} setUser={setUser}/>} />
            <Route path="signup" element={<SignUp user={user} modal={modal} setModal={setModal}/>} /> 
          </Route>
          <Route path={"profile"}>
            <Route index element={<Navigate to="/profile/me" />} />
            <Route path={"search"} element={<SearchProfile user={user}/>}/>
            <Route path="me" element={<Profile user={user} />} />
            <Route path=":pid" element={<Profile user={user} />} />
          </Route>
          <Route path={"topics"} element={<Topics user={user} setUser={setUser} />}>
            <Route index element={<TopicsList  user={user}/>} />
            <Route path=":tid" element={<TopicView user={user} />} />
          </Route>
          <Route path={"FAQ"} element={<FAQ user={user} serUser={setUser} />}>
           
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

