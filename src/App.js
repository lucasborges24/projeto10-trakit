import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import Login from "./Login/Login";
import Cadastro from "./Cadastro/Cadastro";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
