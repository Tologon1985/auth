import axios from "axios";
import Cookies from "js-cookie";
import {history} from "../../lib/history";
import axiosV1 from "../../services/api";

export const signIn = ( data) => {
   return (dispatch) => {
       axios.post("http://localhost:8080/api/v1/signin", data)
           .then(({data})=> {
               Cookies.set('token', data.token, { expires: 1 })
               dispatch({type: "USER_SIGNIN" , payload : data.user})
                history.push("/")
           })
   }
}

export const logout = () => {
    Cookies.remove('token')
    return { type: "USER_LOGOUT"}
}

export const authUser = () => {
    return (dispatch) => {
        axiosV1("http://localhost:8080/api/v1/authentication" )
            .then(({data})=> {
                dispatch({type:"USER_AUTHENTICATE", payload: data.user})
                Cookies.add("token", data.token)
            })
            .catch(()=>{
                dispatch({type:"USER_AUTHENTICATE_FAILED"})
            })
    }
}

export const loginWithGoogle = (response) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/google-login',
            data: {idToken:response.tokenId}
        })
            .then(({data}) => {
                console.log(data)
                Cookies.add("token", data.token)
                dispatch({type: "USER_SIGNIN", payload: data.user})
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            })
    }
}




