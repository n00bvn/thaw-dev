import React, { Fragment, useEffect, useState } from 'react'
import { firebaseDb } from '../firebase'

import Loading from './Loading'
import '../App.css'

export default function Main() {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState(null);
  const [article, setArticle] = useState(null);

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

  const add_click_event_to_tags = () => {
    document.querySelectorAll('.btnTag').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        setTag(e.target.textContent);
      });
    });
  }

  useEffect(() => {
    firebaseDb.ref('thaw_dev_intro').once('value', snapshot => {
      let intro_content = document.getElementById('introContent');
      intro_content.innerHTML = snapshot.val();
      let btn = document.getElementById('btnShowHideIntro');
      let short_intro = document.getElementById('shortIntro');
      btn.classList.remove('d-none');
      btn.addEventListener('click', e => {
        e.preventDefault();
        if (btn.innerText === "∨") {
          btn.innerText = "∧";
        } else {
          btn.innerText = "∨";
        }
        intro_content.classList.toggle('d-none');
        short_intro.classList.toggle('d-none');
      });
    });
    firebaseDb.ref('articles').once('value', snapshot => {
      const a = snapshot.val();
      if (a) {
        let map_articles = [];
        let map_tags = [];
        for (let key in a) {
          let article = a[key];
          article.id = key;
          // filter all the html tags from content
          // article.description = article.content.replace(/<\w+[^>]*>(.+?)<\/\w+>/g, "$1");
          article.description = article.content.replace(/<\w+[^>]*>/g, "").replace(/<\/\w+>/g, "");
          map_articles.push(article);
          map_tags = map_tags.concat(article.tags);
        }

        map_articles.sort((a1, a2) => {
          return new Date(a2.createdAt) - new Date(a1.createdAt);
        });

        setArticles(map_articles);
        setAllArticles(map_articles);
        setTags(filter_unique_array(map_tags).sort(() => {
          return .5 - Math.random();
        }));

        add_click_event_to_tags();
      }

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    add_click_event_to_tags();
  });

  useEffect(() => {
    if (tag) {
      setArticles(allArticles.filter(article => {
        return article.tags.includes(tag);
      }));
    } else {
      setArticles(allArticles);
    }
  }, [tag, allArticles]);

  useEffect(() => {
    if (article) {
      document.getElementById('article_content_area').innerHTML = article.content;
      window.Prism.highlightAll();
    }
  }, [article]);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 bg-info pt-4 px-4 pb-0 text-light" id="introArea">
            <span className="float-right pb-2">
              <button className="btn btn-outline-light btn-sm d-none" id="btnShowHideIntro">∧</button>
            </span>
            <div className="d-none" id="shortIntro">Thaw - Full stack developer | Ruby, Python, React, Meteor</div>
            <div id="introContent"></div>
          </div>
        </div>
      </div>

      {loading ? <Loading /> : (
        article ? (
          <div className="container">
            <div className="row mt-4">
              <div className="col-12 mb-3 text-right">
                <button className="btn btn-primary" onClick={() => setArticle(null)}>Back</button>
              </div>
              <div className="col-12">
                <h4>{article.title}</h4>
                <div className="mt-3" id="article_content_area"></div>
              </div>
              <div className="col-12 mt-4 text-right">
                <button className="btn btn-primary" onClick={() => setArticle(null)}>Back</button>
              </div>
            </div>
          </div>
        ) : (
            <div className="container">
              <div className="row mt-4">
                <div className="col-sm-10 col-12">
                  {tag && (
                    <div className="row">
                      <div className="col-12 text-right mb-4">
                        <button className="btn btn-secondary" onClick={() => setTag(null)}>
                          {tag} <span className="badge badge-dark ml-1">X</span>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    {articles.map(article => {
                      return (
                        <div className="col-md-6 col-sm-12 mb-3" key={article.id}>
                          <div className="card">
                            <h5 className="card-header bg-secondary text-warning cs-pt badge-link-secondary"
                              onClick={() => setArticle(article)}>
                              {article.title}
                            </h5>
                            <div className="card-body">
                              <p className="card-text text-truncate">{article.description}</p>
                            </div>
                            <div className="card-footer text-right px-0">
                              {article.tags.map(tag => {
                                return (
                                  <button className="btn btn-link btnTag footerTag py-0 px-2" key={tag}>{tag}</button>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="col-sm-2 text-center d-none d-sm-block pt-4 px-0">
                  {tag ? null : (
                    tags.map(tag => {
                      return (
                        <span className="badge badge-primary ml-3 btnTag cs-pt badge-link-primary" key={tag}>{tag}</span>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          )
      )}
    </Fragment>
  )
}
