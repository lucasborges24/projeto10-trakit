import styled from 'styled-components'

function Loader() {
    return (
        <Spinner>
            <span></span>
            <span></span>
            <span></span>
        </Spinner>
    )
}

const Spinner = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;


    span {
        width: 10px;
        height: 10px;
        border: double;
        border-color: #126BA5;
        border-radius: 50%;
        margin: 10px;
    }

    span:nth-child(1) {
        animation: jump765 1.6s -0.32s linear infinite;
        background: #2495ff;
    }

    span:nth-child(2) {
        animation: jump765 1.6s -0.16s linear infinite;
        background: #2495ff;
    }

    span:nth-child(3) {
        animation: jump765 1.6s linear infinite;
        background: #2495ff;
    }

    @keyframes jump765 {
        0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
        }

        40% {
        -webkit-transform: scale(2.0);
        transform: scale(2.0);
        }
    }

`

export default Loader