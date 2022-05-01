
const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const createNote = async (autorizacion, user, value) => {

    if(value != ""){
        var csrftoken = getCookie('csrftoken');
        
        const response = await fetch("http://127.0.0.1:8000/api/notes/create/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'user':user, 'body':value})
        })

        if(response.status === 200){
            return "Nota agregada"
        }else{
            return "Ha ocurrido un error"
        }
    }else{
        return "No puede agregar una nota vacia"
    }
}