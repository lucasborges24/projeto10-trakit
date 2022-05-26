import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import UserContext from "../contexts/UserContext";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

function Hoje() {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])




    const { token } = userInfo
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }



    return (
        <>
            <Header />
            <MainHoje>

            </MainHoje>
            <Footer />
        </>
    )
}

const MainHoje = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
`

export default Hoje