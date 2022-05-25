import styled from "styled-components";

import logo from "../assets/images/logo.svg"

function Login() {
    return (
        <>
            <Img src={logo} alt="logo" />
            
        </>
    )
}

const Img = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5em auto 1em auto;
`

export default Login;