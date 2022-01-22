import axiosV1 from "../../services/api";


export const getNews = () => {
    return (dispatch) => {
        dispatch ({type:"BLOG_REQUEST"})
        axiosV1("http://localhost:8080/api/v1/news")
            .then(({data})=> {
             dispatch({type:"BLOG_SUCCESS", payload:data})
            })
            .catch((error)=>  dispatch({type:"BLOG_FAILED"}))
    }
}

