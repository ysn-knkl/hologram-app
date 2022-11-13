import axios from "axios";

const ApiManager = axios.create({
    baseURL:"https://63710ce507858778617556d9.mockapi.io/",
    responseType:"json"
})

export default ApiManager