import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css'

import Main from './components/Main'
import Admin from './components/Admin'

import { BlogProvider } from './components/contexts/BlogContext'

function App() {
  return (
    <BlogProvider>
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/admin/*" component={Admin} />
          <Route exact path="/*" component={Main} />
        </Switch>
      </HashRouter>
    </BlogProvider>
  );
}

export default App;
