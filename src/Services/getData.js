import axios from "axios";

const http = axios.create({
    baseURL: "https://shop1.i-plan.uz/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }

})

export default http;