import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import dayjs from 'dayjs'
import { locale } from "dayjs/locale/pt-br";

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

    const now = dayjs().locale('pt-br');
    console.log(now.format("dddd, DD/MM"))

    const data = now.format("dddd, DD/MM");

    return (
        <>
            <Header />
            <MainHoje>
                {now.format("dddd, DD/MM")}
            </MainHoje>
            <Footer />
        </>
    )
}

const MainHoje = styled.main`
    width: 100vw;
    height: 100vh;
    margin-top: 70px;
    background-color: #E5E5E5;
`

export default Hoje