
export const deleteNote = async (noteId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/notes/delete/${noteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(response.status === 200){
        return "Nota eliminada"
    }else{
        return "La nota no se pudo eliminar correctamente"
    }
}