import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AuthContext";
import { getNotes } from "../Services/getNotes";
import { createNote } from "../Services/createNote";
import { updateNote } from "../Services/updateNote";
import { deleteNote } from "../Services/deleteNote";
import "../styles/HomePage.css";

export const Home = () => {
    
    const { logOut, autorizacionToken, user } = useContext(AppContext);
    const [notes, setNotes] = useState([]);
    
    let updateNoteId = 0;

    useEffect(() => {
        getNotes(autorizacionToken.access, updateNoteId).then(data => {
            setNotes(data);
        })
    }, []);

    const nota = document.getElementById('nota');

    return(
        <div className="HomeContainer">
            <button id="logOut" onClick={logOut}>Cerrar Sesión</button>
            <div className="Container">
                <div className="NoteContainer">
                    <input id="nota" placeholder="Nota" type="text"/>
                    <button 
                        onClick={() => updateNoteId === 0 ? createNote(autorizacionToken.access, user.user_id, nota.value).then(response => {
                        updateNoteId = 0
                        getNotes(autorizacionToken.access, updateNoteId).then(data => {
                            setNotes(data);
                        })
                        nota.value = "";
                        alert(response);
                    }) : updateNote(updateNoteId, nota.value).then(response => {
                        updateNoteId = 0
                        getNotes(autorizacionToken.access, updateNoteId).then(data => {
                            setNotes(data);
                        })
                        nota.value = "";
                        alert(response);
                    }) }>Enviar</button>
                </div>
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <div className="note">
                                <p>{note.body}</p>
                            </div>
                            <div className="buttons">
                                <button className="button" onClick={() => getNotes(autorizacionToken.access, note.id).then(response => {
                                    nota.value = response.body
                                    updateNoteId = response.id
                                })} id="editar">Editar</button>
                                <button className="button" id="eliminar" onClick={() => deleteNote(note.id).then(response => {
                                    updateNoteId = 0
                                    getNotes(autorizacionToken.access, updateNoteId).then(data => {
                                        setNotes(data);
                                    })
                                    alert(response);
                                })}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>  
    )
}