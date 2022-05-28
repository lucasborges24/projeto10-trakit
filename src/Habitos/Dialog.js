import styled from "styled-components"

function Dialog({
    message,
    onDialog
}) {

    return (
        <Div>
            <div className="box">
                <h3>{message}</h3>
                <div className="buttons">
                    <button onClick={() => onDialog(true)} style={{
                        background: "#D90202",
                        marginRight: "20px"
                    }}>Apagar</button>
                    <button onClick={() => onDialog(false)} style={{
                        background: " #52B6FF",
                        marginLeft: "20px"
                    }}>Cancelar</button>
                </div>
            </div>
        </Div>
    )
}

const Div = styled.div`
    position: fixed;
    top: 0; right: 0; left: 0; bottom: 0;
    background-color: rgba(0,0,0,0.5);
    font-family: 'Lexend Deca';

    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #eee;
        width: 300px;
        height: 200px;
        flex-direction: column;
        border-radius: 8px;
    }

    .buttons {
        display: flex;
        align-items: center;
        margin-top: 35px;
    }

    button {
        color: #fff;
        padding: 10px;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        font-family: 'Lexend Deca';
    }

    h3 {
        font-family: 'Lexend Deca';
        color: #666666;
        text-align: center;
        font-size: 27px;
    }
`


export default Dialog