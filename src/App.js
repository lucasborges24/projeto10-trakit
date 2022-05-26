import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useState } from "react";

import GlobalStyle from "./GlobalStyle";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/Cadastro";
import Hoje from "./hoje/Hoje";


function App() {

  const [userInfo, setUserInfo] = useState([]);


  return (
    <UserContext.Provider value={{userInfo, setUserInfo }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
