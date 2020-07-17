import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'

import TinymceEditor from './tinymce_editor'
import Loading from '../Loading'

export default function ArticleForm(props) {
  const initState = {
    title: '',
    content: '',
    tags: []
  }
  const [article, setArticle] = useState(initState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.match.params.article_id) {
      firebaseDb.ref(`articles/${props.match.params.article_id}`).once('value')
        .then(snapshot => {
          let article = snapshot.val();
          article['tags'] = article['tags'].join(', ');
          setArticle(article);
          setLoading(false);
        })
        .catch(error => {
          alert('ERROR');
          console.log(error);
          setLoading(false);
        })
    } else {
      setLoading(false);
    }
  }, [props]);

  const handleSubmit = e => {
    e.preventDefault();
    firebaseDb.ref('articles').push(article, error => {
      if (error) {
        alert('ERROR');
        console.log(error);
      } else {
        props.history.goBack();
      }
    })
  }

  const handleChange = e => {
    const val = e.target.name === 'tags' ? e.target.value.split(', ') : e.target.value;
    setArticle({
      ...article,
      [e.target.name]: val
    });
  }

  const handleEditorChange = (content, editor) => {
    setArticle({
      ...article,
      'content': content
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mt-5">
          {loading ? <Loading /> : (
            <form onSubmit={e => handleSubmit(e)} className="mt-5">
              <input type="text" name="title" className="form-control mb-4" placeholder="Title" onChange={e => handleChange(e)} value={article.title} />
              <TinymceEditor initValue={article.content} handleEditorChange={handleEditorChange} />
              <input type="text" name="tags" className="form-control mt-4" placeholder="Tags" onChange={e => handleChange(e)} value={article.tags} />

              <div className="text-center m-3">
                <button className="btn btn-primary btn-lg mr-3" type="submit">Submit</button>
                <a href="/admin/" className="btn btn-secondary">Cancel</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
