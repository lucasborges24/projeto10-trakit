import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import axios from 'axios';


import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import 'react-calendar/dist/Calendar.css';

import Header from "../shared/Header"
import Footer from "../shared/Footer"
import Loader from '../shared/Loader';

function Historico() {

    const navigate = useNavigate();
    const { userInfo, percent } = useContext(UserContext)

    const [value, setValue] = useState(new Date().toString().split(" ")[2]);
    const { token } = userInfo
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const [done, setDone] = useState([]);
    const [unDone, setUndone] = useState([]);
    const [history, setHistory] = useState([])


    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])

    useEffect(() => {
        if (token !== undefined) {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily"
            const response = axios.get(URL, config)

            response.then(({ data }) => {
                setHistory(data)
                foreach(data);
            }).catch("algo aconteceu")
        }
    }, [])

    function foreach(history) {
        if (history !== 0) {
            let auxDone = [];
            let auxUnDone = []
            history.forEach((id) => {
                let hasUndone = false;
                for (let i = 0; i < id.habits.length; i++) {
                    if (id.habits[i].done === false) {
                        hasUndone = true
                    }
                }
                if (hasUndone) {
                    auxUnDone.push(id.day)
                }
                if (!hasUndone) {
                    auxDone.push(id.day)
                }
            })
            setDone(auxDone);
            setUndone(auxUnDone)
        }

    }







    dayjs.locale(require("dayjs/locale/pt-br"));

    function tileClassName({ view, date }) {
        if (view === 'month') {
            if (dayjs(date).format("DD") === value) {
                return "oi"
            }
            if (done.includes(dayjs(date).format("DD/MM/YYYY"))) {
                return 'day-done'
            }

            if (unDone.includes(dayjs(date).format("DD/MM/YYYY"))) {
                return 'day-undone'
            }
        }
    }


    function createCalendar() {
        if (history.length === 0) {
            return (
                <Loader text="Um Segundo..." />
            )
        } else {
            return (
                <MainHistorico>
                    <h1>Histórico</h1>
                    <Calen>
                        <Calendar
                            locale={"pt-br"}
                            calendarType={"US"}
                            tileClassName={tileClassName}
                            className={"roott"}
                        />
                    </Calen>
                </MainHistorico>
            )
        }
    }

    const showCalendar = createCalendar()


    return (
        <>
            <Header />
            {showCalendar}
            <Footer percent={percent} />
        </>
    )
}

const MainHistorico = styled.main`
    /* width: 100vw; */
    height: 100vh;
    margin-top: 70px;
    padding: 28px 15px 0 15px;
    background-color:  #E5E5E5;

    h1 {
        font-family: 'Lexend Deca';
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }

    h2 {
        font-family: 'Lexend Deca';
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`

const Calen = styled.div`

    .roott {
        border-radius: 10px;
        border: none;
        margin: 0 auto;
        padding: 5px;
    }
    

    .day-done {
        background-color: green;
        border-radius: 100%;
        padding: 10px;
        background-color: #8CC654;
    }

    .day-done:hover {
        background-color: #8CC654;
        filter: brightness(1.2);
    }

    .day-undone {
        background-color: red;
        border-radius: 50%;
        aspect-ratio: 1;
        background-color: #EA5766;
    }

    .day-undone:hover {
        background-color: #EA5766;
        filter: brightness(1.2);
    }
`

export default Historico