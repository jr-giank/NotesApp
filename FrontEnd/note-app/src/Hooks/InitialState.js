import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const InitialState = () => {
    const [autorizacionToken, setAutorizacionToken] = useState(() => localStorage.getItem('autorizacionToken') ? JSON.parse(localStorage.getItem('autorizacionToken')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('autorizacionToken') ? jwt_decode(localStorage.getItem('autorizacionToken')) : null);     
    const [loading, setLoading] = useState(true);

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
            alert('Usuario o contraseña incorrectos');
        }
    }

    const updateToken = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh':autorizacionToken.refresh})
        })

        let data = await response.json();

        if(response.status === 200){
            setAutorizacionToken(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('autorizacionToken', JSON.stringify(data));
        }else{
            logOut();
        }
    } 

    const logOut = () => {
        setAutorizacionToken(null);
        setUser(null);
        localStorage.removeItem('autorizacionToken');
    }

    const registerService = async (values) => {
        let response = await fetch("http://127.0.0.1:8000/api/sign/up/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        
        if (response.status === 200){
            alert('El usuario se a registrado con exito')
        }else{
            alert('Ha ocurrido un error');
        }
    }

    useEffect(() => {
        let time = 1000 * 60 * 4

        let interval = setInterval(() => {
            if(autorizacionToken){
                updateToken();
            }
        }, time)

        return () => clearInterval(interval)

    }, [autorizacionToken, loading])

    return{
        user,
        autorizacionToken,
        registerService,
        loginService,
        updateToken,
        logOut
    }
}