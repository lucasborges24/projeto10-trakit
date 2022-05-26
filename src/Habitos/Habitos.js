import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useContext,  useEffect} from 'react';

import UserContext from '../contexts/UserContext';
import Header from "../shared/Header"
import Footer from "../shared/Footer"

function Habitos() {

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
            <MainHabitos>
                oi meu chapa
            </MainHabitos>
            <Footer />
        </>
    )
}

const MainHabitos = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: #E5E5E5;
`

export default Habitos