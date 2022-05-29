import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';

import Header from "../shared/Header"
import Footer from "../shared/Footer"

function Historico() {

    const navigate = useNavigate();
    const { userInfo, percent } = useContext(UserContext)

    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])

    return (
        <>
            <Header />
            <MainHistorico>

                <h1>Histórico</h1>
                <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
            </MainHistorico>
            <Footer percent={percent}/>
        </>
    )
}

const MainHistorico = styled.main`
    width: 100vw;
    height: 100vh;
    margin-top: 70px;
    padding: 28px 15px 0 15px;
    background-color:  #E5E5E5;

    h1 {
        font-family: 'Lexend Deca';
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }

    h2 {
        font-family: 'Lexend Deca';
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`

export default Historico