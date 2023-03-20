import axios from "axios";

//Componentes que manejan la comunicación con el servidor

const url = 'http://localhost:3001/persons'

//Select *
const getAll = () => {
    const request = axios.get(url)
    return (
        request.then(response => response.data)
    )
}

//Insert
const create = (newObject) => {
    const request = axios.post(url, newObject)
    return (
        request.then(response => response.data)
    )
}

//Update
const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return (
        request.then(response => response.data)
    )
}

export default { getAll, create, update }