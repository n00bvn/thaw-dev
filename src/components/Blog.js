import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BlogContext } from './contexts/BlogContext'
import ListArticles from './blog/ListArticles'
import { get_all_unique_tags } from './utilities/blog'

export default function Blog() {
  const { blog_state } = useContext(BlogContext);
  const articles = blog_state.articles;
  const tags = get_all_unique_tags(articles);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 text-center mb-4">
          {tags.map(tag => {
            return (
              <Link to={`/blog/tag/${tag}`} className="badge badge-primary ml-3 btnTag cs-pt badge-link-primary animate__animated animate__bounceIn" key={tag}>
                {tag}
              </Link>
            )
          })}
        </div>

        <ListArticles articles={articles} />
      </div>
    </div>
  )
}
