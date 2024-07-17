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
import Header from "./components/authenticated/Header";
import Footer from "./components/authenticated/Footer";
import Frineds from "./components/authenticated/Frineds/Frineds";

const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  const isLogin = !!idtoken;

  return (
    <div>
      {isLogin ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friends" element={<Frineds />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/singin" />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/reset" element={<ResetPassword />}></Route>
            <Route path="/update/:id" element={<UpdatePassword />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
