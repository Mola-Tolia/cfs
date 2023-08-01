import axios from "axios";

let request = axios.create({
    baseURL:"http://localhost:9000",
    timeout:5000,
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    }
})


//请求拦截器
request.interceptors.request.use(config => {

    config.headers["token"] = localStorage.getItem('token')

    return config
})

//响应拦截器
request.interceptors.response.use(res => res.data,err => {

})

export default request