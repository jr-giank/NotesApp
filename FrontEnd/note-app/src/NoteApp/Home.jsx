import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AuthContext";
import { getNotes } from "../Services/getNotes";
import { createNote } from "../Services/createNote";
import "../styles/HomePage.css";

export const Home = () => {
    
    const {logOut} = useContext(AppContext);
    const { autorizacionToken } = useContext(AppContext);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes(autorizacionToken.access).then(data => {
            setNotes(data);
        })
    }, []);

    const nota = document.getElementById('nota');
    
    return(
        <div className="HomeContainer">

            <div className="Container">
                <div className="NoteContainer">
                    <input id="nota" placeholder="Nota" type="text"/>
                    <button onClick={() => createNote(autorizacionToken.access, nota.value).then(response => {
                        // alert(response);
                        console.log(response);
                    })}>Enviar</button>
                </div>
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <div className="note">
                                <p>{note.body}</p>
                            </div>
                            <div className="buttons">
                                <button className="button" id="editar">Editar</button>
                                <button className="button" id="eliminar">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => console.log(nota.value, autorizacionToken)}>Nota</button>
            </div>
        </div>  
    )
}