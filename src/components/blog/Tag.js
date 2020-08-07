import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BlogContext } from '../contexts/BlogContext'

import ListArticles from './ListArticles'

export default function Tag() {
  const params = useParams();
  const { blog_state } = useContext(BlogContext);
  const articles = blog_state.articles.filter(article => article.tags.includes(params.tag));

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 text-left mb-4">
          <Link to="/blog" className="btn btn-secondary animate__animated animate__bounceInRight">
            {params.tag} <span className="badge badge-dark ml-1">X</span>
          </Link>
        </div>

        <ListArticles articles={articles} />
      </div>
    </div>
  )
}
