import React, { createContext, useEffect, useReducer, useState } from 'react'
import { BlogReducers } from '../reducers/BlogReducers'
import { GetArticlesAction } from '../actions/BlogActions'

import Loading from '../commons/Loading'

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const initBlog = {
    loading: true,
    articles: [],
    error: null,
    message: null,
    submited: false
  }

  const [blog_state, blog_dispatch] = useReducer(BlogReducers, initBlog);
  const [blogSubmiting, setBlogSubmiting] = useState(false);

  useEffect(() => {
    if (!blog_state.loading) {
      setBlogSubmiting(false);
      return;
    }

    GetArticlesAction(blog_dispatch);
  }, [blog_state]);

  return (
    <BlogContext.Provider value={{ blog_state, blog_dispatch, setBlogSubmiting }}>
      {blog_state.loading || blogSubmiting ? <Loading /> : children}
    </BlogContext.Provider>
  )
}
