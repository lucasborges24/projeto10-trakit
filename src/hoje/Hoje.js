import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import dayjs from 'dayjs'
import { locale } from "dayjs/locale/pt-br";
import { BallTriangle, Grid } from 'react-loader-spinner'

import UserContext from "../contexts/UserContext";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Loader from "../shared/Loader";

function Hoje() {


    const navigate = useNavigate();
    const { userInfo, todayHabitData, setTodayHabitData, percent, setPercent, habits } = useContext(UserContext)
    const [changeHabit, setChangeHabit] = useState();
    const [iconButton, setIconButton] = useState(true);
    const [fazerOLoadFunfar, setFazerOLoadFunfar] = useState(0)

    console.log(habits)
    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])

    const { token } = userInfo
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const now = dayjs().locale('pt-br');

    

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const response = axios.get(URL, config);
        response.then(({ data }) => {
            setTodayHabitData(data)
            setFazerOLoadFunfar(1);
            if (todayHabitData.length === 0) {
                setPercent(0)
            } else {
                const aux = data.filter((item) => item.done === true)
                console.log(aux.length)
                setPercent((aux.length / data.length) * 100)
            }
        }).catch("algo aconteceu")
    }, [changeHabit])

    if (todayHabitData.length === 0) {
        setPercent(0)
    }

    function toggleHabit(id, done) {
        console.log("passei aq")
        if (id !== null) {
            if (done) {

                const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
                const requisition = axios.post(URL, {}, config);

                requisition.then(() => {
                    setChangeHabit(Math.random())
                    console.log("deu bao")
                    const aux = todayHabitData.filter((item) => item.done === true)
                    setPercent((aux.length / todayHabitData.length) * 100)
                    setIconButton(true);

                })
                    .catch((err) => alert("houve um erro ao desmarcar o hábito." + err.response.status))
            } else {
                const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
                const requisition = axios.post(URL, {}, config);

                requisition.then(() => {
                    setChangeHabit(Math.random())
                    console.log("deu bao")
                    const aux = todayHabitData.filter((item) => item.done === true)
                    setPercent((aux.length / todayHabitData.length) * 100)
                    setIconButton(true);
                })
                    .catch((err) => alert("houve um erro ao marcar o hábito como feito." + err.response.status))
            }
        }
    }
    console.log(iconButton)

    function createTodayHabit() {
        return (
            <>
                {todayHabitData.map((item, key) =>
                    <HabitBox backgroundcolor={item.done} record={item.highestSequence >=item.currentSequence} recordplus={item.highestSequence}>
                        <div className="habit-text">
                            <h2>{item.name}</h2>
                            <div className="subtitle">
                                <h3>
                                    Sequência atual: <span className="first">
                                        {item.currentSequence > 1 ?
                                         `${item.currentSequence} dias`
                                        :
                                        item.currentSequence === 1 ?
                                        `${item.currentSequence} dia` :
                                        `0`
                                        
                                        }
                                         </span>
                                </h3>
                                <h3>Seu recorde: <span className="second">
                                    {item.highestSequence}
                                    </span></h3>
                            </div>
                        </div>
                        <div className="habit-check" >
                            {iconButton ?
                                <ion-icon name="checkbox" onClick={() => {
                                    setIconButton(false);
                                    toggleHabit(item.id, item.done)
                                }}></ion-icon>
                                :
                                <ion-icon name="checkbox"></ion-icon>
                            }
                        </div>
                    </HabitBox>
                )}
            </>
        )
    }

    function createLoaderBall() {
        return (
            <LoaderBall>
                <BallTriangle color="#00BFFF" height={80} width={80} margin="0 auto" />
            </LoaderBall>
        )
    }

    function loadingao() {
        if (fazerOLoadFunfar === 0) {
            return (
                loaderBall
            )
        } else {
            return (
                todayHabit
            )
        }
    }

    const todayHabit = createTodayHabit()
    const loaderBall = createLoaderBall()
    const loading = loadingao()

    return (
        <>
            <Header />
            <MainHoje>
                <h1>{now.format("dddd, DD/MM").replace(/^\w/, (c) => c.toUpperCase())}</h1>
                <Subtitle textcolor={percent}>
                    {percent === 0 ? <>Nenhum hábito concluído ainda</> : <>{Math.round(percent)}% dos hábitos concluídos</>}
                </Subtitle>
                <TodayHabits>
                    {loading}
                </TodayHabits>
            </MainHoje>
            <Footer percent={percent} />
        </>
    )
}

function color(percent) {
    if (percent === 0) return "#BABABA"
    return "#8FC549"
}

function background(done) {
    if (done) return "#8FC549"
    else return "#EBEBEB"
}

function backgroundCurrent(done) {
    if (done) return "#8FC549"
    else return "#666666"
}

function backgroundRecord(done, plus) {
    if (plus === 0) return "#666666"
    if (done) return "#8FC549"
    else return "#666666"
}

const LoaderBall = styled.div`
        margin-top: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
`

const MainHoje = styled.main`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    margin-top: 70px;
    padding: 30px 15px 110px 15px;
    background-color: #E5E5E5;

    h1 {
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`

const Subtitle = styled.h2` 
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${({ textcolor }) => color(textcolor)}; // props here
`
const TodayHabits = styled.div` 
    margin-top: 28px;
    position: relative;
`

const HabitBox = styled.div` 
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px;
    font-family: 'Lexend Deca';

    .habit-check {
        max-width: 75px;
        max-height: 75px;
        /* margin-right: 25px; */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ion-icon {
        font-size: 7em;
        color: ${({ backgroundcolor }) => background(backgroundcolor)};
        border-radius: 5px;
    }

    .habit-text {
        width: 300px;
        min-width: 50%;
        margin-right: 5px;
    }

    h2 {
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 7px;
        word-wrap: break-word;
    }

    h3 {
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
    }

    .first {
        color: ${({ backgroundcolor }) => backgroundCurrent(backgroundcolor)};
    }

    .second {
        color: ${({ record, recordplus }) => backgroundRecord(record, recordplus)};
    }
`

export default Hoje