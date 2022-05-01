
export const getNotes = async (autorizacion, idNote) => {

    if(idNote === 0){
        const response = await fetch("http://127.0.0.1:8000/api/notes/list/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(autorizacion)
            },
        })

        const data = await response.json();

        return data
    }else{
        const response = await fetch(`http://127.0.0.1:8000/api/notes/update/${idNote}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(autorizacion)
            },
        }) 

        const data = await response.json();
        
        return data
    }
}