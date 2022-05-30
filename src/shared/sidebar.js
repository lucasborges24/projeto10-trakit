import styled from 'styled-components'
import UserContext from '../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'



function Sidebar() {

    const {sidebaropen, setSidebaropen} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <SidebarDiv onClick={() => setSidebaropen(false)}>
            <div className="div" onClick={e => {
                e.stopPropagation()
            }}>
            <button onClick={(event) => {
                event.stopPropagation()
                localStorage.removeItem("dados")
                navigate("/")}} >
                <p>Sair</p>
                <svg strokeWidth="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
            </button>
            </div>

        </SidebarDiv>
    )
}

const SidebarDiv = styled.div` 

    position: fixed;
    top: 0px;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255,0.8);
    z-index: 2;

    

   .div {
    position: fixed;
    top: 0px;
    right: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 30vw;
    height: 100vh;
    background-color: #82b7f7;
   }

    /* From uiverse.io by @satyamchaudharydev */
button {
  padding: 0;
  margin-top: 30px;
  border: none;
  background: none;
}

button {
  --primary-color: #fff;
  --hovered-color: #126BA5;
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 20px;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
}

button p {
  margin: 0;
  position: relative;
  font-size: 20px;
  color: var(--primary-color)
}

button::after {
  position: absolute;
  content: "";
  width: 0;
  left: 0;
  bottom: -7px;
  background: var(--hovered-color);
  height: 2px;
  transition: 0.3s ease-out;
}

button p::before {
  position: absolute;
/*   box-sizing: border-box; */
  content: "Sair";
  width: 0%;
  inset: 0;
  color: var(--hovered-color);
  overflow: hidden;
  transition: 0.3s ease-out;
}

button:hover::after {
  width: 100%;
}

button:hover p::before {
  width: 100%;
}

button:hover svg {
  transform: translateX(4px);
  color: var(--hovered-color)
}

button svg {
  color: var(--primary-color);
  transition: 0.2s;
  position: relative;
  width: 15px;
  transition-delay: 0.2s;
}
`

export default Sidebar;