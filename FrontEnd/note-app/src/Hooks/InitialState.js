import { useState } from "react";
import jwt_decode from "jwt-decode";

export const InitialState = () => {
    const [autorizacionToken, setAutorizacionToken] = useState(() => localStorage.getItem('autorizacionToken') ? JSON.parse(localStorage.getItem('autorizacionToken')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('autorizacionToken') ? jwt_decode(localStorage.getItem('autorizacionToken')) : null);     

    const loginService = async (values) => {
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    
        let data = await response.json();
    
        if (response.status === 200){
            setAutorizacionToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('autorizacionToken', JSON.stringify(data));
        }else{
            alert('Ha ocurrido un error');
        }
    }

    const registerService = async (values) => {
        let response = await fetch("", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    
        let data = await response.json();
    
        if (response.status === 200){
            setAutorizacionToken(data);
            setUser(data);
            localStorage.setItem('autorizacionToken', JSON.stringify(data));
        }else{
            alert('Ha ocurrido un error');
        }
    }

    return{
        user,
        autorizacionToken,
        registerService,
        loginService
    }
}