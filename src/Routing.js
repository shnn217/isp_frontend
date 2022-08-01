import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes, Navigate,useNavigate } from "react-router-dom";
import Portal from "./pages/Portal";
import Login from "./pages/Login";
import SignUp from './pages/Signup';



export default function Routing() {
  let UserInfo = localStorage.getItem('User')
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(UserInfo?JSON.parse(UserInfo):{name:''});
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal user={user} serUser={setUser}/>}>
          <Route index element={<>home</>} />
          <Route path={"login"} >
            <Route index element={<Login setUser={setUser} />} />
            <Route path="signup" element={<SignUp user={user} />} />
          </Route>
          <Route path={"profile"}>
            <Route index element={<Navigate to="/profile/me" />} />
            <Route path="me" element={<>my profile</>} />
            <Route path=":pid" element={<>other people</>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
