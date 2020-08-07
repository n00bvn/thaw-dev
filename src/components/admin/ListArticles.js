import React, { useContext } from 'react'
import { BlogContext } from '../contexts/BlogContext'
import { Link } from 'react-router-dom'
import { DeleteArticle } from '../actions/BlogActions'
import { AuthContext } from '../contexts/AuthContext'
import { LogoutAction } from '../actions/AuthActions'

export default function ListArticles() {
  const { blog_state, blog_dispatch } = useContext(BlogContext);
  const articles = blog_state.articles;

  const { auth_dispatch } = useContext(AuthContext);

  const handleDelete = article => {
    if (window.confirm('Are your sure deleting the article?')) {
      DeleteArticle(blog_dispatch, article);
    }
  }

  const handleLogout = () => {
    LogoutAction(auth_dispatch);
  }

  return (
    <div className="container-fluid">
      {blog_state.message && (
        <div className="alert alert-info">
          {blog_state.message}
        </div>
      )}

      <div className="row">
        <div className="col-12 text-center">
          <h4>Admin List Articles</h4>
        </div>

        <div className="col-12 mt-4">
          <div className="my-3 text-right">
            <Link to="/articles/" className="btn btn-primary">Add new Article</Link>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => {
                  return (
                    <tr key={article.id}>
                      <td className="font-weight-bold">{article.title}</td>
                      <td>{article.description}</td>
                      <td>{article.tags.join(', ')}</td>
                      <td className="text-center">
                        <Link to={`/articles/${article.id}`} className="btn btn-success">Edit</Link><br />
                        <button className="btn btn-danger btn-sm mt-3" onClick={() => handleDelete(article)}>Delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Link to="/edit_intro" className="btn btn-primary">Edit Intro</Link>
          </div>
        </div>

        <div className="col-12 p-4 text-right">
          <button className="btn btn-link mr-5" onClick={() => handleLogout()}>Log Out</button>
          <a href="/" className="ml-5">Back to Index</a>
        </div>
      </div>
    </div>
  )
}
