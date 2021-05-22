import axios from "axios"

const AxiosInstance = axios.create({
    baseURL : `https://api.covid19api.com`
})

export default AxiosInstance;