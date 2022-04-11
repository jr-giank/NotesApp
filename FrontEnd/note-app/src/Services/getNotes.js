
export const getNotes = async (autorizacion) => {

    let response = await fetch("http://127.0.0.1:8000/api/notes/list/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(autorizacion)
        },
    })

    let data = await response.json();

    return data
}