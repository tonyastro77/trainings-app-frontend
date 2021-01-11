import axios from 'axios'
const baseUrl = '/api/customers'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteItem = (id, deletedObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, deletedObject)
    return request.then(response => response.data)
}

export default {
    getAll : getAll,
    create : create,
    update : update,
    deleteItem : deleteItem,
}