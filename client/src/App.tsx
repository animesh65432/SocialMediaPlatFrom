import React from "react";
import Singup from "./components/Singup";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Routes, Route } from "react-router-dom";
import Singin from "./components/Singin";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
const App: React.FC = () => {
  const idtoken = useSelector((state: RootState) => state.user.idtoken);
  const islogin = !!idtoken;

  return (
    <div>
      {islogin ? (
        <>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/singin" element={<Singin />}></Route>
            <Route path="/singup" element={<Singup />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
