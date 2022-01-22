const initialState = {
    user:{},
    auth:false,
    isLoadingUserInfo: true
}


const userReducer=( state = initialState, action)=> {
switch (action.type){
    case "USER_SIGNIN":
        return {...state, user: action.payload, auth: true}
    case "USER_LOGOUT":
        return {...initialState, isLoadingUserInfo: false}
    case "USER_AUTHENTICATE":
        return {...state, user: action.payload, auth: true, isLoadingUserInfo: false}
    case "USER_AUTHENTICATE_FAILED":
        return {...state, isLoadingUserInfo: false}
    default:
        return state
}
}

export default userReducer