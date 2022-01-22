import React from 'react';
import GoogleLogin from "react-google-login";
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginWithGoogle} from "../../redux/actions/userActions";


const GoogleAuth = () => {
    const dispatch = useDispatch()
    const responseGoogle = response => {
        dispatch(loginWithGoogle(response))
    }
    return (
        <div className="pb-3">
            <GoogleLogin
                clientId = "463557839196-o81b6dlv8mr6f00nf4t9d1kl1m0stb85.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-danger btn-lg btn-block"
                    >
                    Login wiht Google
                    </button>
                )}
                cookiePolicy={'single_host_origin'}
              />,
        </div>
    )

};

export default GoogleAuth;