
export const updateNote = async (idNote, value) => {
    
    const response = await fetch(`http://127.0.0.1:8000/api/notes/update/${idNote}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + String(autorizacion)
        },
        body: JSON.stringify({'id': idNote, 'body': value})
    }) 

    if(response.status === 200){
        return "Nota Actualizada"
    }else{
        return "Ha ocurrido un error"
    }
}