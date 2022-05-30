import styled from 'styled-components'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import trackit from '../assets/images/TrackIt.svg'
import UserContext from '../contexts/UserContext'

function Header() {

    const { userInfo, setSidebaropen } = useContext(UserContext);
    const { image } = userInfo;


    return (
        <Head>
            <Link to="/hoje">
                <ImgLogo src={trackit} alt="logo image" />
            </Link>
            <div className="divlegal">
                <ImgUser src={image} alt="user image" />
                <ion-icon onClick={() => setSidebaropen(true)} name="reorder-three-outline"></ion-icon>
            </div>
        </Head>
    )
}

const Head = styled.header`
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    .div-legal {
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    ion-icon {
        font-size: 45px;
        color: white;
        cursor: pointer;
    }
`

const ImgLogo = styled.img`
    width: 97px;
    height: 49px;
`

const ImgUser = styled.img`
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    object-fit: cover;
`

export default Header
