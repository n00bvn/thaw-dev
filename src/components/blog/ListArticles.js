import React from 'react'
import { Link } from 'react-router-dom'

export default function ListArticles({ articles }) {
  return (
    articles.map(article => {
      return (
        <div className="col-lg-6 col-md-12 mb-4 animate__animated animate__zoomIn" key={article.id}>
          <div className="card">
            <h6 className="card-header text-primary cs-pt badge-link-secondary">
              <Link to={`/blog/${article.id}`}>{article.title}</Link>
            </h6>
            <div className="card-body">
              <p className="card-text">{article.description}</p>
            </div>
            <div className="card-footer text-right px-0">
              {article.tags.map(tag => {
                return (
                  <Link to={`/blog/tag/${tag}`} className="btn btn-link btnTag footerTag py-0 px-2" key={tag}>
                    {tag}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )
    })
  )
}
