import React, { Fragment, useState, useEffect } from 'react'
import { firebaseDb, firebaseAuth } from '../../firebase'
import { Link } from 'react-router-dom'

import EditIntro from './EditIntro'
import Loading from '../Loading'

export default function ListArticles() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    firebaseDb.ref('articles').once('value')
      .then(snapshot => {
        const a = snapshot.val();
        if (a) {
          let map_articles = [];
          for (let key in a) {
            let article = a[key];
            article.id = key;
            map_articles.push(article);
          }
          map_articles.sort((a1, a2) => {
            return new Date(a2.createdAt) - new Date(a1.createdAt);
          });
          setArticles(map_articles);
        }
        setLoading(false);
      })
      .catch(error => {
        alert('ERROR');
        console.log(error);
        setLoading(false);
      })
  }, []);

  const [editingIntro, setEditingIntro] = useState(false);

  const toggleIntro = () => {
    setEditingIntro(!editingIntro);
  }

  const handleDelete = article_id => {
    firebaseDb.ref(`articles/${article_id}`).remove()
      .then(() => {
        setArticles(
          articles.filter(article => {
            return article.id !== article_id;
          })
        );
      })
      .catch(error => {
        alert('ERROR');
        console.log(error);
      })
  }

  const handleLogout = () => {
    firebaseAuth.signOut()
      .then(() => {
        console.log('LOGGED OUT');
      })
      .catch((error) => {
        alert('ERROR');
        console.log(error);
      })
  }

  return (
    <div className="container">
      <div className="col-12">
        <h1>Admin List Articles</h1>
      </div>

      <div className="col-12 mt-4">
        {editingIntro ? <EditIntro toggleIntro={toggleIntro} /> : (
          loading ? <Loading /> : (
            <Fragment>
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
                          <td>{article.title}</td>
                          <td>{article.content.substr(0, 125)}</td>
                          <td>{article.tags.join(', ')}</td>
                          <td className="text-center">
                            <Link to={`/articles/${article.id}`} className="btn btn-success">Edit</Link><br />
                            <button className="btn btn-danger btn-sm mt-3" onClick={() => handleDelete(article.id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <button className="btn btn-primary" onClick={toggleIntro}>Edit Intro</button>
              </div>
            </Fragment>
          )
        )}
      </div>

      <div className="col-12 p-4 text-right">
        <button className="btn btn-link mr-5" onClick={() => handleLogout()}>Log Out</button>
        <a href="/" className="ml-5">Back to Index</a>
      </div>
    </div>
  )
}
