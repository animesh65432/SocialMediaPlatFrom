import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Singin,
  Home,
  Singup,
  NotFound,
  UpdatePassword,
  ResetPassword,
  Header,
  UpdateProfile,
  Room,
  MobileNavbar,
  Others,
  CreateRoom
} from "./components"
const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  const isLogin = !!idtoken;

  return (
    <div className="bg-slate-300 font-mono h-[100vh]">
      {isLogin ? (
        <>
          <div className="md:block hidden">
            <Header />
          </div>
          <div className="md:hidden block">
            <MobileNavbar />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Others />}></Route>
            <Route path="/video" element={<CreateRoom />}></Route>
            <Route path="/Rooms/:roomId" element={<Room />}></Route>
            <Route path="/updateprofile" element={<UpdateProfile />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/singin" />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/reset" element={<ResetPassword />}></Route>
            <Route path="/update/:id" element={<UpdatePassword />}></Route>
            <Route path="*" element={<Navigate to="/singin" />}></Route>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
