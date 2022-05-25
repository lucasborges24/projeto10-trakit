import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import logo from "../assets/images/logo.svg"

function Cadastro() {

    const [cadastroData, setCadastroData] = useState({
        email: '',
        senha: '',
        nome: '',
        foto: ''
    })

    function inputs() {
        return (
            <>
                <input
                    type="email"
                    placeholder="email"
                    required
                    value={cadastroData.email}
                    onChange={e => setCadastroData({ ...cadastroData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="senha"
                    required
                    value={cadastroData.senha}
                    onChange={e => setCadastroData({ ...cadastroData, senha: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="nome"
                    required
                    value={cadastroData.nome}
                    onChange={e => setCadastroData({ ...cadastroData, nome: e.target.value })}
                />
                <input
                    type="url"
                    placeholder="foto"
                    required
                    value={cadastroData.foto}
                    onChange={e => setCadastroData({ ...cadastroData, foto: e.target.value })}
                />
                <button>
                    Cadastrar
                </button>
                <LinkLogin to="/">
                    <h3>Já tem uma conta? Faça login!</h3>
                </LinkLogin>
            </>
        )
    }

    const forms = inputs()

    return (
        <>
            <Img src={logo} alt="logo" />
            <Form>{forms}</Form>
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

export default Cadastro