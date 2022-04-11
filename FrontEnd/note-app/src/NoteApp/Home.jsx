import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AuthContext";
import { getNotes } from "../Services/getNotes";

export const Home = () => {
    
    const {logOut} = useContext(AppContext);
    const { autorizacionToken } = useContext(AppContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes(autorizacionToken.access).then(data => {
            setNotes(data);
        })
    }, []);
    
    return(
        <div>
            <h1>Home Page</h1>

            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.body}</p>
                    </li>
                ))}
            </ul>
        </div>  
    )
}