import axios from "axios";


export const endpoints = {
    'houses': "/houses/",
    'categories': "/categories/",
    'rooms': (house_Id) => `/houses/${house_Id}/rooms/`,
    'roomDetail': (roomId) => `/rooms/${roomId}/`,
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'register': '/users/',
    'comments': (roomId) => `/rooms/${roomId}/comments/`
}

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST
})