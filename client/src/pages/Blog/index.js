import React, {useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {isAuth} from "../../lib/authentication";
import {getNews} from "../../redux/actions/blogActions";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";




const Blog = () => {
const dispatch = useDispatch()
    const {news, isLoading} = useSelector(s=> s.blog)
    const auth = useSelector(s=> s.user.auth)

    useEffect(()=> {
        dispatch(getNews())
    },[])

    return (
        <Layout>
            {
                isLoading ? <Spinner/> :
                    <>
                        <div className="flex justify-between items-center">
                            <h2>Blog</h2>
                            {
                                auth &&
                                <Link to="/create-post"
                                      className="bg-indigo-700 hover:bg-indigo-500 text-white ml-4 py-2 px-3 rounded-lg">
                                    Create Post
                                </Link>
                            }
                        </div>
                        <div>
                            {
                                news.map(item =>
                                    <div key={item._id} className="mb-8">
                                        <Link className="text-2xl text-bold" to ={`/news/${item._id}`}>
                                            {item.title}
                                        </Link>
                                        <p>{item.description.split("").slice(0,50).join("")}...</p>
                                        <Link to = {`/user/${item.user._id}`}>
                                            {item.user.name}
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </>
            }
        </Layout>
    );
};

export default Blog;