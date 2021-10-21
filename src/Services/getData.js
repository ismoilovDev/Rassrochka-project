import axios from "axios";

const http = axios.create({
    baseURL: "http://back-end.i-plan.uz/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }

})

export default http;