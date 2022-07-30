import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Portal from "./pages/Portal";

export default function Routing() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setc] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portal currentUser={currentUser} />}>
          <Route index element={<>home</>} />
          <Route path={"login"} >
            <Route index element={<>login</>}/>
            <Route path="signup" element={<>signup</>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
