import React, { useContext, useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { AuthContext } from '../contexts/AuthContext'

import Auth from './Auth'
import ListArticles from './ListArticles'
import ArticleForm from './ArticleForm'
import EditIntro from './EditIntro'
import NotFound from '../commons/NotFound'

export default function Dashboard() {
  // Change admin page style for full page
  useEffect(() => {
    document.getElementsByTagName("body")[0].style = 'padding-left: 0 !important';
  });

  const { auth_state } = useContext(AuthContext);

  return (
    <HashRouter basename="admin">
      {auth_state.message && (
        <div className="alert alert-info text-center">
          {auth_state.message}
        </div>
      )}

      {auth_state.user ? (
        <Switch>
          <Route exact path="/" component={ListArticles} />
          <Route exact path="/edit_intro" component={EditIntro} />
          <Route path="/articles/:article_id?" component={ArticleForm} />
          <Route path="*" component={NotFound} />
        </Switch>
      ) : <Auth />}
    </HashRouter>
  )
}
