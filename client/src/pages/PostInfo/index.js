import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../components/Layout";
import {useParams} from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {comment} from "postcss";
import Spinner from "../../components/Spinner";
import {addComment, getPost} from "../../redux/actions/postActions";


const PostInfo = () => {
    const {id} = useParams()
    const {post, isLoading} = useSelector(s => s.post)
    const {user} = useSelector(s => s.user)
    const dispatch = useDispatch()
    const [value,setValue] = useState({content:""})


    const handleChange = (e) => {
        setValue({content: e.target.value})
    }

    const handleSubmit =(e)=> {
        e.preventDefault()
        dispatch(addComment(value, id, user._id))
    }
    useEffect(()=> {
        dispatch(getPost(id))
    },[])


    return (
        <Layout>
            <ToastContainer/>
          <h2 className="text-4xl">{post.title}</h2>
          <h2>{post.description}</h2>
            {
                isLoading ? <Spinner/> :
                    <>
                        <div>
                            {
                                post.comments.map(item =>
                                    <div className="mb-4" key={item._id}>
                                        <div>Автор:{item.user.name}</div>
                                        <div>{item.content}</div>
                                    </div>
                                )
                            }
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="w-full md:w-full px-3 mb-2 mt-2">
                                <h2 className=" pt-3 pb-2 text-gray-800 text-lg">Comments</h2>
                                <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                          name="content" placeholder='Create comment'
                                          value={value.content}
                                          onChange={handleChange}
                                          required/>
                            </div>
                            <div className="w-full md:w-full flex items-start md:w-full px-3">
                                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                                </div>
                                <div className="-mr-1">
                                    <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Add comment'/>
                                </div>
                            </div>
                        </form>
                    </>
            }
        </Layout>
    );
};

export default PostInfo;