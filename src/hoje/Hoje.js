import { useState, useContext, useEffect } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";

function Hoje() {

    const {token} = useContext(UserContext)
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

   

    return (

        <p>oi meu chapa</p>
    )
}

export default Hoje