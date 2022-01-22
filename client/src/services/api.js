import axios from "axios";
import Cookies from "js-cookie";


const axiosV1 = axios.create()

axiosV1.interceptors.request.use((config)=> {
    const token = Cookies.get("token")
    return {
        ...config,
        headers: {
            ...config.headers,
            ...(token ? {"auth-token": token} : {})
        }
    }
    },(error) => Promise.reject(error)
)

axiosV1.interceptors.response.use(
    (response) => response,
    (error)=> {
        if(error.response.status === 401) {
            Cookies.remove("token")
        }
        return Promise.reject(error)
    }
)

export default axiosV1