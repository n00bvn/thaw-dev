import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main'
import Admin from './components/Admin'
import NotFound from './components/NotFound'

import { BlogProvider } from './components/contexts/BlogContext'

function App() {
  return (
    <BlogProvider>
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/admin/*" component={Admin} />
          <Route exact path="/*" component={Main} />
          <Route path="*" component={NotFound} />
        </Switch>
      </HashRouter>
    </BlogProvider>
  );
}

export default App;
