import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import UserContext from '../contexts/UserContext';
import Header from "../shared/Header"
import Footer from "../shared/Footer"
import axios from 'axios';
import HabitsList from './HabitsList';
import Dialog from './Dialog';
import Loader from '../shared/Loader';

function Habitos() {

    const navigate = useNavigate();
    const { userInfo, habits, setHabits, percent } = useContext(UserContext)
    const { token } = userInfo;
    const [enableButton, setEnableButton] = useState(true)
    const [buttonSend, setButtonSend] = useState(true);
    const [habitData, setHabitData] = useState({
        name: '',
        days: []
    });
    const [daySelected, setDaySelected] = useState(false);
    const [dialogg, setDialogg] = useState({
        message: '',
        isLoading: false,
        id: undefined
    })
    const [deleting, setDeleting] = useState(false)
    const [change, setChange] = useState()


    useEffect(() => {
        if (userInfo.length === 0) {
            navigate("/");
        }
    }, [userInfo])

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        setDeleting(true)
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const response = axios.get(URL, config)

        response.then(({ data }) => {
            setDeleting(false)
            const dados = data;
            setHabits(dados);
        })
    }, [change])






    const [days, setDays] = useState([{
        day: 'D',
        selected: false
    },
    {
        day: 'S',
        selected: false
    },
    {
        day: 'T',
        selected: false
    },
    {
        day: 'Q',
        selected: false
    },
    {
        day: 'Q',
        selected: false
    },
    {
        day: 'S',
        selected: false
    },
    {
        day: 'S',
        selected: false
    },
    ])
    

    function sendHabit() {
        if (buttonSend) {
            if (habitData.name.length === 0) {
                return alert("Por favor, coloque o nome do hábito.")

            }
            if (habitData.days.length === 0) {
                return alert("Por favor, selecione ao menos um dia para praticar o hábito.")
            }

            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
            const requisition = axios.post(URL, habitData, config);

            requisition.then((data) => {
                console.log("passando pra avisar que o gabriel é um ótimo tutor")
                navigate("/hoje")
            }).catch(() => alert("houve um erro. tente novamente."))
        }
        setButtonSend(false);
    }




    function toggleDay(selected, id) {
        console.log(buttonSend)
        if (!buttonSend) {
            return;
        }
        days.map((i, keyy) => {
            const a = [...days]
            if (keyy === id) {
                if (selected) {
                    a[id] = { day: days[id].day, selected: false }
                    const aux2 = { ...habitData, days: [...habitData.days].filter(item => item !== id) }
                    console.log(aux2)
                    setHabitData(aux2)
                    return setDays(a)
                } else if (!selected) {
                    a[id] = { day: days[id].day, selected: true }
                    const aux = { ...habitData, days: [...habitData.days, id].sort((l, m) => l - m) }
                    console.log(aux)
                    setHabitData(aux)
                    return setDays(a)
                }
            }
        })

    }


    function CreateNewHabit() {
        return (
            <NewHabit>
                <HabitName placeholder='nome do hábito' value={habitData.name} onChange={e => setHabitData({ ...habitData, name: e.target.value })} />
                <Days>
                    {days.map((i, key) =>
                        <Day
                            selected={i.selected}
                            onClick={() => toggleDay(i.selected, key)}><p>{i.day}</p>
                        </Day>)}
                </Days>
                <SaveHabit onClick={() => {
                    sendHabit();
                }}>
                    Salvar
                </SaveHabit>
                <h4 onClick={() => setEnableButton(true)}>Cancelar</h4>
            </NewHabit>
        )
    }

    function areYouSureDelete(choose) {
        if (choose) {
            deletar(dialogg.id)
            setDialogg({
                message: '',
                isLoading: false,
                id: undefined
            })
        } else {
            setDialogg({
                message: '',
                isLoading: false,
                id: undefined
            })
        }
    }

    function deletar(id) {
        if (id !== undefined) {
            setDeleting(true)
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
            const requisition = axios.delete(URL, config);

            requisition.then(() => {
                setChange(id)
            }).catch(() => alert("aconteceu algo"))

        }
    }

    const newhabit = CreateNewHabit();

    return (
        <>
            <Header />
            {deleting ? <Loader /> :
                <MainHabitos>
                    <HabitTitle>
                        <h1>Meus hábitos</h1>
                        <ButtonHabit onClick={() => setEnableButton(false)}>
                            <p>+</p>
                        </ButtonHabit>
                    </HabitTitle>
                    {enableButton ? <></> : newhabit}
                    {habits.length === 0 ?
                        <NonHabits>
                            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                        </NonHabits>
                        :
                        <HabitsList dayss={days} dialog={dialogg} setDialog={setDialogg} />
                    }
                </MainHabitos>
            }
            {dialogg.isLoading && <Dialog message={dialogg.message} onDialog={areYouSureDelete} />}
            <Footer percent={percent}/>



        </>
    )
}


function color(daySelected) {
    if (daySelected) return "#fff"
    else return "#DBDBDB"
}

function background(daySelected) {
    if (daySelected) return "#DBDBDB";
    else return "#fff"
}



const MainHabitos = styled.main`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    margin-top: 70px;
    padding-bottom: 110px;
    padding-top: 30px;
    background-color: #E5E5E5;
`

const HabitTitle = styled.div` 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    
   
   h1 {
        font-family: 'Lexend Deca';
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
   }
`

const ButtonHabit = styled.div`
    width: 40px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    p {
        font-family: 'Lexend Deca';
        font-size: 27px;
        color: #FFFFFF;
    }
`

const NonHabits = styled.div` 
    padding: 0 15px;
    margin-top: 20px;
    font-family: 'Lexend Deca';
    font-size: 18px;
    line-height: 22px;
    color: #666666;
`

const NewHabit = styled.div` 
    /* width: 100%; */
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 20px 15px;
    position: relative;

    h4 {
        font-family: 'Lexend Deca';
        font-size: 15.976px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
        position: absolute;
        bottom: 22px; right: 120px;
        cursor: pointer
    }

`

const HabitName = styled.input` 
    /* max-width: 265px; */
    width: 90%;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin: 18px 18px 10px 18px;
    padding-left: 10px;
    font-size: 1em;
    line-height: 22px;
    color: var(--input-color);

    ::placeholder {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }

    :focus {
        border-color: var(--color-blue);
        outline: none;
    }
`

const Days = styled.div` 
    margin-left: 15px;
    display: flex;

`

const Day = styled.div` 
    width: 30px;
    height: 30px;
    background: ${({ selected }) => background(selected)};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    

    p {
        font-family: 'Lexend Deca';
        font-size: 20px;
        color: ${({ selected }) => color(selected)};
    }
`

const SaveHabit = styled.div` 
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 15px; right: 15px;

    font-family: 'Lexend Deca';
    font-size: 16px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;
`

export default Habitos