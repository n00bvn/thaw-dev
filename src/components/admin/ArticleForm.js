import React, { useState, useContext, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { BlogContext } from '../contexts/BlogContext'
import { CreateArticle, UpdateArticle } from '../actions/BlogActions'
import TinymceEditor from './tinymce_editor'
import { get_all_unique_tags } from '../utilities/blog'

export default function ArticleForm() {
  const { blog_state, blog_dispatch, setBlogSubmiting } = useContext(BlogContext);
  const articles = blog_state.articles;
  const tags = get_all_unique_tags(articles);

  const { article_id } = useParams();
  let initState;
  if (article_id) {
    const a = articles.find(a => a.id === article_id);
    initState = {
      ...a,
      tags: a.tags.join(', ')
    };
  } else {
    initState = {
      title: '',
      content: '',
      tags: '',
      createdAt: ''
    }
  }
  const [article, setArticle] = useState(initState);

  const history = useHistory();

  useEffect(() => {
    // After the form is successfully submited,
    // we go to the list articles page
    if (blog_state.submited) {
      history.push("/");
    }
  }, [blog_state, history]);

  const handleSubmit = e => {
    e.preventDefault();
    setBlogSubmiting(true);
    article_id ? UpdateArticle(blog_dispatch, article) : CreateArticle(blog_dispatch, article);
  }

  const handleChange = e => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value
    });

    // suggest tags
    if (e.target.name === 'tags') {
      const current_tag = e.target.value.replace(/(.+, )/g, "");
      const regex = new RegExp(current_tag, 'g');
      const suggest_tags = tags.filter(
        tag => tag.match(regex)
      );

      document.getElementById('divTagSuggestions').innerHTML = suggest_tags.join(', ');
    }
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
          {blog_state.error && (
            <div className="alert alert-danger">
              {blog_state.message}
            </div>
          )}

          <form onSubmit={e => handleSubmit(e)} className="mt-5">
            <input type="text" name="title" className="form-control mb-4" placeholder="Title" onChange={e => handleChange(e)} value={article.title} />

            <TinymceEditor initValue={article.content} handleEditorChange={handleEditorChange} />

            <input type="text" name="tags" className="form-control mt-4" placeholder="Tags" onChange={e => handleChange(e)} value={article.tags} />
            <div id="divTagSuggestions">{tags.join(', ')}</div>

            <div className="text-center m-3">
              <button className="btn btn-primary btn-lg mr-3" type="submit">Submit</button>
              <Link to="/" className="btn btn-secondary">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
