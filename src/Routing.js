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
import Setting from './pages/Setting';
import Topics from './pages/Topics';
import AfterLinkedinLogin from "./pages/AfterLinkedinLogin";
import "./style/Global.scss";

export default function Routing() {
  let UserInfo = localStorage.getItem("User");
  const [user, setUser] = useState(
    UserInfo ? JSON.parse(UserInfo) : { name: "" }
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal user={user} serUser={setUser} />}>
          <Route index element={<Home user={user} />} />
          <Route  path={"Setting"} element={<Setting user={user} setUser={setUser} />} />
          <Route path={"login"}>
            <Route index element={<Login setUser={setUser} />} />
            <Route path="after_linkedin" element={<AfterLinkedinLogin/>} />
            <Route path="signup" element={<SignUp user={user} />} />
          </Route>
          <Route path={"profile"}>
            <Route index element={<Navigate to="/profile/me" />} />
            <Route path="me" element={<Profile user={user} />} />
            <Route path=":pid" element={<Profile user={user} />} />
          </Route>
          <Route path={"topics"}>
            <Route index element={<Topics  user={user}/>} />
            {/* <Route path=":tid" element={<Profile user={user} />} /> */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

