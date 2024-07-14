import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Routes, Route, Navigate } from "react-router-dom";
import Singup from "./components/Singup";
import Singin from "./components/Singin";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import UpdatePassword from "./components/UpdatePassword";
import ResetPassword from "./components/ResetPassword";

const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  const isLogin = !!idtoken;

  return (
    <div>
      <Routes>
        {isLogin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/singin" />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/reset" element={<ResetPassword />}></Route>
            <Route path="/update/:id" element={<UpdatePassword />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
