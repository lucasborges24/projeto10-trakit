import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function Footer({percent}) {
    const por = percent;
    return (
        <>
            <FooterDiv>
                <Link to="/habitos">
                    <h3>Hábitos</h3>
                </Link>
                <Link to="/historico">
                    <h3>Histórico</h3>
                </Link>
            </FooterDiv>
            <Circular>
                <Link to="/hoje">
                    <CircularProgressbar value={por}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </Link>
            </Circular>
        </>
    )
}

const FooterDiv = styled.footer`
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    height: 70px;
    background-color: #FFF;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 35px;

    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: var(--color-blue);
    }

    a {
        text-decoration: none;
    }
`

const Circular = styled.div`
    position: fixed;
    bottom: 10px; left: 50%;
    transform: translateX(-50%);
    width: 91px;
    height: 91px;
`


export default Footer