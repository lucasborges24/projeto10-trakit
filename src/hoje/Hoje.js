import { useState, useContext } from "react";

import UserContext from "../contexts/UserContext";
import Loader from "../shared/Loader";

function Hoje() {

    const {token} = useContext(UserContext)
    console.log(token)

    return (

        <p>oi meu chapa</p>
    )
}

export default Hoje