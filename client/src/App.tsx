import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Join,
  Roomid,
  MobileNavbar,
  Others
} from "./components";


import { createthepeer } from "./store/slices/SocketSlices";

const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  console.log(idtoken)
  const isLogin = !!idtoken;
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color.color);
  console.log(color, isLogin);

  useEffect(() => {
    dispatch(createthepeer());
  }, [idtoken, isLogin]);

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
            <Route path="/video" element={<Join />}></Route>
            <Route path="/Rooms/:roomid" element={<Roomid />}></Route>
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
