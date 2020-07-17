import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import firebaseDb from './firebase';

import Main from './components/Main'
import ListArticles from './components/admin/ListArticles'
import ArticleForm from './components/admin/ArticleForm'
import NotFound from './components/NotFound'

function App() {
  useEffect(() => {
    // firebaseDb.child('thaw_admin_password').on('value', snapshot => {
    //   console.log(snapshot.val());
    // });
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" component={ListArticles} />
        <Route path="/admin/articles/:article_id?" component={ArticleForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
