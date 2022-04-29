
export const createNote = async (autorizacion, value) => {

    if(value != ""){
        const response = await fetch("http://127.0.0.1:8000/api/notes/create/", {
            // mode: "no-cors",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(autorizacion)
            },
            // body: JSON.stringify(value)
            body: value
        })

        const data = await response.json();

        if(data.status === 200){
            return "Nota agregada"
        }else{
            return data
        }
    }else{
        return "No puede agregar una nota vacia"
    }
}