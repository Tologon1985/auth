import Cookies from "js-cookie";




export const isAuth = () => {
  const token =  Cookies.get('token')
    const user =  JSON.parse( localStorage.getItem("user"))
    return !!(token && user) ? user : false

}
export const logout = () => {
        Cookies.remove('user')
        localStorage.removeItem("user")
}

