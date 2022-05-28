import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

import { useContext,  useEffect} from 'react';
import UserContext from '../contexts/UserContext';

import Header from "../shared/Header"
import Footer from "../shared/Footer"

function Historico() {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])
    
    return (
        <>
            <Header />
            <MainHistorico>
                oi meu chapa
            </MainHistorico>
            <Footer />
        </>
    )
}

const MainHistorico = styled.main`
    width: 100vw;
    height: 100vh;
    margin-top: 70px;
    background-color: #E5E5E5;
`

export default Historico