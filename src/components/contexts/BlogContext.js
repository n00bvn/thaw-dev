import React, { createContext, useState, useEffect } from 'react'
import { firebaseDb } from '../../firebase'

import Loading from '../Loading'

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebaseDb.ref('articles').once('value')
      .then(snapshot => {
        const a = snapshot.val();
        if (a) {
          let map_articles = [];
          for (let key in a) {
            let article = a[key];
            article.id = key;
            article.description = article.content.replace(/<\w+[^>]*>/g, "").replace(/<\/\w+>/g, "");
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

  return (
    <BlogContext.Provider value={{ articles, setArticles, setLoading }}>
      {loading ? <Loading /> : children}
    </BlogContext.Provider>
  )
}
