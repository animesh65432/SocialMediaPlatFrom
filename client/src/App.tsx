import React, { useEffect } from "react";
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
  Footer,
  Profile,
  Join,
  Roomid,
} from "./components";
import { useDispatch } from "react-redux";
import { createthepeer } from "./store/slices/SocketSlices";

const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  const isLogin = !!idtoken;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(createthepeer());
    }
  }, []);

  return (
    <div>
      {isLogin ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />}></Route>
            <Route path="/video" element={<Join />}></Route>
            <Route path="/Rooms/:roomid" element={<Roomid />}></Route>
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
