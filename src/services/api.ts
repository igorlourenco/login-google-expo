import axios from "axios"

const api = axios.create({
    baseURL: "http://20.14.2.113:3333" // IP address where your API ins running
});

export default api;