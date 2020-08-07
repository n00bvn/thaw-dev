import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { escape_javascript } from '../utilities/html'

import { BlogContext } from '../contexts/BlogContext'
import NotFound from '../commons/NotFound'

export default function Article() {
  const params = useParams();
  const { blog_state } = useContext(BlogContext);
  const article = blog_state.articles.find(a => a.id === params.article_id);

  // Activate Prism code highlight
  useEffect(() => {
    window.Prism.highlightAll();
  }, []);

  return (
    article ? (
      <div className="container animate__animated animate__fadeIn">
        <div className="row mt-4">
          <div className="col-12 mb-3 text-right">
            <Link to="/blog" className="btn btn-primary">Back</Link>
          </div>
          <div className="col-12">
            <h4>{article.title}</h4>
            <div className="mt-3" dangerouslySetInnerHTML={{ __html: escape_javascript(article.content) }}></div>
          </div>
          <div className="col-12 mt-4 mb-4 text-right">
            <Link to="/blog" className="btn btn-primary">Back</Link>
          </div>
        </div>
      </div>
    ) : <NotFound />
  )
}
