const initialState = {
    post:{},
    isLoading:true,
    error : ""
}


const postReducer=( state = initialState, action)=> {
    switch (action.type){
        case "POST_REQUEST":
            return {...state, isLoading: true}
        case "POST_SUCCESS":
            return {...state, post: action.payload, isLoading: false}
        case "POST_FAILED":
            return {...state, isLoading: false, error: action.payload}
        case "COMMENT_SUCCESS":
            return {...state, post: {...state.post, comments: [...state.post.comments, action.payload]}}
        default:
            return state
    }
}

export default postReducer