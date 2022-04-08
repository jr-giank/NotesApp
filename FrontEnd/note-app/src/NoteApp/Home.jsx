import React, { useContext } from "react";
import { AppContext } from "../Context/AuthContext";

export const Home = () => {
    const {logOut} = useContext(AppContext);
    
    return(
        <div>
            <h1>Hello World</h1>
        </div>  
    )
}