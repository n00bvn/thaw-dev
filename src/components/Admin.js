import React, { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { firebaseAuth } from '../firebase'

import Auth from './admin/Auth'
import ListArticles from './admin/ListArticles'
import ArticleForm from './admin/ArticleForm'
import NotFound from './NotFound'
import Loading from './Loading'

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  firebaseAuth.onAuthStateChanged(function (user) {
    setAdmin(user);
    setLoading(false);
  });

  return (
    <HashRouter basename="/admin">
      {loading ? <Loading /> : (
        admin ? (
          <Switch>
            <Route exact path="/" component={ListArticles} />
            <Route path="/articles/:article_id?" component={ArticleForm} />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : <Auth setAdmin={setAdmin} />
      )}
    </HashRouter>
  )
}
