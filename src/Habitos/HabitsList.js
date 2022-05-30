import { useContext } from 'react';
import styled from 'styled-components'

import UserContext from '../contexts/UserContext';
import Loader from '../shared/Loader';

function HabitsList(props) {

    const { dayss, setDialog } = props
    const { habits } = useContext(UserContext)

    if (habits.length === null) return <Loader text="Um segundo..."/>

    function DeletHabit (id) {   
        setDialog({
            message: "Você quer mesmo excluir o hábito?",
            isLoading: true,
            id: id
        })
    }

    return (
        <>
            {
                habits.map((i, key) =>
                    <HabitList key={key}>
                        <h2>{i.name}</h2>
                        <ion-icon onClick={() => DeletHabit(i.id)} name="trash-outline"></ion-icon>
                        <HabitDays key={key}>
                            {
                                dayss.map((j, keyy) =>
                                    <HabitDay key={keyy} keyy={keyy} habits={i} >
                                        <p>{j.day}</p>
                                    </HabitDay>
                                )
                            }
                        </HabitDays>
                    </HabitList>
                )
            }
            
        </>

    )
}

function color(key, habits) {
    for (let i = 0; i < habits.days.length; i++) {
        if (habits.days[i] === key) return "#fff"
    }
    return "#DBDBDB"
}

function background(key, habits) {
    for (let i = 0; i < habits.days.length; i++) {
        if (habits.days[i] === key) return "#DBDBDB"
    }
    return "#fff"
}

const HabitList = styled.div` 
    height: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 20px 15px;
    position: relative;

    h2 {
        font-family: 'Lexend Deca';
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        padding-top: 15px;
        margin-left: 15px;
        word-wrap: break-word;
        width: 85%;
    }

    ion-icon {
        position: absolute;
        top: 10px; right: 10px;
        font-size: 17px;
        cursor: pointer;
    }
`

const HabitDays = styled.div` 
    margin-left: 15px;
    display: flex;
    margin-top: 10px;
    padding-bottom: 15px;

`

const HabitDay = styled.div` 
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    background: ${({ keyy, habits }) => background( keyy, habits)};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    

    p {
        font-family: 'Lexend Deca';
        font-size: 20px;
        color: ${({ keyy, habits }) => color( keyy, habits)};
    }
`



export default HabitsList