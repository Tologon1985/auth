import React, {useEffect} from 'react';
import { Router, Route, Switch} from "react-router-dom";
import {history} from "../../lib/history";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../redux/actions/userActions";
import App from "../../App";
import CreatePost from "../../pages/CreatePost";
import Private from "../../pages/Private";
import Admin from "../../pages/Admin";
import Signup from "../../pages/Signup";
import Signin from "../../pages/Signin";
import Blog from "../../pages/Blog";
import UserInfo from "../../pages/UserInfo";
import PostInfo from "../../pages/PostInfo";
import PrivateRoute from "../PrivateRoute";
import AdminRoute from "../AdminRoute";
import Spinner from "../Spinner";



const Routes = () => {
    const dispatch  = useDispatch()
    const {isLoadingUserInfo} = useSelector(s=> s.user)

    useEffect(()=> {
            dispatch(authUser())
    },[])
    if (isLoadingUserInfo) {
        return <Spinner/>
    }
    return (
        <Router history = {history}>
          <Switch>
              <Route exact path="/" component={App}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/signin" component={Signin}/>
              <Route exact path="/blog" component={Blog}/>
              <Route exact path="/user/:id" component={UserInfo}/>
              <Route exact path="/news/:id" component={PostInfo}/>
              <PrivateRoute exact path="/create-post" component={CreatePost}/>
              <PrivateRoute exact path="/private" component={Private}/>
              <AdminRoute exact path="/admin" component={Admin}/>
          </Switch>
        </Router>
    )
}

export default Routes;