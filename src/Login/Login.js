import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import logo from "../assets/images/logo.svg"
import UserContext from "../contexts/UserContext";
import Loader from "../shared/Loader";

function Login() {

    const { setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const [estaSalvo, setEstaSalvo] = useState(false)
    const [loginData, setLoginData] = useState({ email: '', senha: '' });
    const [enabledButton, setEnabledButton] = useState(true)

    if ((JSON.parse(localStorage.getItem("dados")) !== null)) {
        if (estaSalvo === false) {
            setEstaSalvo(true);
        }
        atualizaHojeScreen();
    }

    function atualizaHojeScreen() {
        const dadosSalvos = JSON.parse(localStorage.getItem("dados"))
        const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: dadosSalvos.email,
            password: dadosSalvos.senha
        });

        response
            .then(({ data }) => {
                setUserInfo(data)
                navigate("/hoje")
            })
            .catch(() => {
                localStorage.removeItem("dados")
                setEnabledButton(true)
                setEstaSalvo(false);
            })
    }


    function inputs() {
        return (
            <>
                <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginData.email}
                    onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="senha"
                    required
                    value={loginData.senha}
                    onChange={e => setLoginData({ ...loginData, senha: e.target.value })}
                />
                <button>
                    {
                        enabledButton ?
                            "Entrar"
                            :
                            <p>Carregando...</p>
                    }
                </button>
                <LinkLogin to="/cadastro">
                    <h3>Não tem uma conta? Cadastre-se!</h3>
                </LinkLogin>
            </>
        )
    }

    function signup(event) {
        event.preventDefault();
        if (!enabledButton) {

        } else {
            setEnabledButton(false)
            const response = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
                email: loginData.email,
                password: loginData.senha
            });

            response
                .then(({ data }) => {
                    setUserInfo(data);
                    localStorage.setItem("dados", JSON.stringify(loginData))
                    navigate("/hoje")
                })
                .catch(err => {
                    alert("Ocorreu o erro: " + err.response.statusText + ". Por favor, tente novamente.");
                    setEnabledButton(true)
                })
        }
    }


    const forms = inputs()


    return (
        <>
            {
                estaSalvo

                    ?

                    <Loader />

                    :

                    <>
                        <Img src={logo} alt="logo" />
                        <Form onSubmit={signup}>{forms}</Form>
                    </>
            }
        </>
    )
}

const Img = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5em auto 2em auto;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input,
    button {
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 0.5em;
        padding: 1em;
        font-size: 1em;
        line-height: 22px;
        color: var(--input-color);
    }

    input:focus,
    button:focus {
        border-color: var(--color-blue);
        outline: none;
    }

    input::placeholder {
        font-size: 1.3em;
        line-height: 25px;
        color: var(--placeholder-color);
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-blue);
        color: #FFFFFF;
        font-size: 1.4em;
        cursor: pointer;
    }


`

const LinkLogin = styled(Link)`

    margin-top: 25px;

    h3 {
        font-size: 15px;
        font-weight: 400;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`

export default Login;