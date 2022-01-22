import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import Layout from "../../components/Layout";
import axios from "axios";
import Spinner from "../../components/Spinner";

const UserInfo = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    useEffect(()=> {
        axios(`http://localhost:8080/api/v1/user/${id}`)
            .then(({data})=>{
                setUser(data)
                setIsLoading(false)
            })
    },[])

        return (
            <Layout>
                {
                isLoading ? <Spinner/> :
                <>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <div className="mt-8">
                    {
                      user?.news.map(item =>
                            <h2>{item.title}</h2>
                        )
                    }
                </div>
                </>
             }
            </Layout>
        );
}

export default UserInfo;