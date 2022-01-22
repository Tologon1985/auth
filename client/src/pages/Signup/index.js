import React from 'react';
import {useState} from "react";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import Layout from "../../components/Layout";

const Signup = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method:"POST",
            url: "http://localhost:8080/api/v1/signup",
            data: values
        }).then(({data}) => {
            toast.success(data.message)
            setValues({name:"", email:"",password:""})
        })
            .catch((e)=> {
                toast.error(e.response.data.message)
                setValues({name:"", email:"",password:""})
            })
    }
    return (
        <Layout>
            <ToastContainer/>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
                        <div
                            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
                        >
                            Sign Up
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-normal mb-2"
                                htmlFor="username"
                            >
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="name"
                                type="text"
                                required
                                placeholder="Name"
                                onChange={handleChange}
                                value={values.name}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-normal mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                type="email"
                                required
                                placeholder="Email"
                                onChange={handleChange}
                                value={values.email}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-normal mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                                autoComplete="off"
                                onChange={handleChange}
                                value={values.password}
                            />
                        </div>
                        <div classNameName="flex items-center justify-between">
                            <button className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Signup;