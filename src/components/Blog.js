import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BlogContext } from './contexts/BlogContext'

import '../App.css'

export default function Blog() {
  const params = useParams();
  const { articles } = useContext(BlogContext);

  const [blogArticles, setBlogArticles] = useState([]);
  const [blogTags, setBlogTags] = useState([]);
  const [blogTag, setBlogTag] = useState(null);
  const [blogPost, setBlogPost] = useState(null);

  const filter_unique_array = array => {
    if (array.length > 0) {
      var unique_array = [];
      array.forEach(function (a) {
        if (a && !unique_array.includes(a)) {
          unique_array.push(a);
        }
      });

      return unique_array;
    } else {
      return [];
    }
  }

  useEffect(() => {
    if (params.blog_id) {
      setBlogArticles([]);
      setBlogTag(null);
      setBlogTags([]);
      setBlogPost(articles.find(article => article.id === params.blog_id));
    } else if (params.tag) {
      setBlogPost(null);
      setBlogTags([]);
      setBlogTag(params.tag);
      setBlogArticles(articles.filter(article => article.tags.includes(params.tag)));
    } else {
      setBlogPost(null);
      setBlogTag(null);
      const tags = [];
      articles.map(article => article.tags.map(tag => tags.push(tag)));
      setBlogTags(filter_unique_array(tags));
      setBlogArticles(articles);
    }
  }, [params, articles]);

  return (
    blogPost ? (
      <div className="container animate__animated animate__fadeIn">
        <div className="row mt-4">
          <div className="col-12 mb-3 text-right">
            <Link to="/blog" className="btn btn-primary">Back</Link>
          </div>
          <div className="col-12">
            <h4>{blogPost.title}</h4>
            <div className="mt-3" dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
          </div>
          <div className="col-12 mt-4 mb-4 text-right">
            <Link to="/blog" className="btn btn-primary">Back</Link>
          </div>
        </div>
      </div>
    ) : (
        <div className="container">
          <div className="row mt-4">
            <div className="col-12 text-center mb-4">
              {blogTag ? (
                <div className="row">
                  <div className="col-12 text-right mb-4">
                    <Link to="/blog" className="btn btn-secondary">
                      {blogTag} <span className="badge badge-dark ml-1">X</span>
                    </Link>
                  </div>
                </div>
              ) : (
                  blogTags.map(tag => {
                    return (
                      <Link to={`/blog/tag/${tag}`} className="badge badge-primary ml-3 btnTag cs-pt badge-link-primary animate__animated animate__bounceIn" key={tag}>
                        {tag}
                      </Link>
                    )
                  })
                )}
            </div>

            {blogArticles.map(article => {
              return (
                <div className="col-lg-6 col-md-12 mb-4 animate__animated animate__zoomIn" key={article.id}>
                  <div className="card">
                    <h6 className="card-header text-primary cs-pt badge-link-secondary">
                      <Link to={`/blog/${article.id}`}>{article.title}</Link>
                    </h6>
                    <div className="card-body">
                      <p className="card-text">{`${article.description.substr(0, 255)} ...`}</p>
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
            })}
          </div>
        </div>
      )
  )
}
