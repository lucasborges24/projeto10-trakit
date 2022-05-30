import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { useState } from "react";

import GlobalStyle from "./GlobalStyle";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/Cadastro";
import Hoje from "./hoje/Hoje";
import Habitos from "./Habitos/Habitos";
import Historico from "./Historico/Historico";


function App() {

  const [userInfo, setUserInfo] = useState([]);
  const [habits, setHabits] = useState([]);
  const [todayHabitData, setTodayHabitData] = useState([]);
  const [percent, setPercent] = useState(0)
  const [sidebaropen, setSidebaropen] = useState(false);
  

  return (
    <UserContext.Provider value={{userInfo, setUserInfo, sidebaropen, setSidebaropen, habits, setHabits, todayHabitData, setTodayHabitData, percent, setPercent }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/hoje" element={<Hoje />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
