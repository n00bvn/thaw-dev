import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from './components/Main'
import Admin from './components/Admin'
import NotFound from './components/NotFound'

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin/*" component={Admin} />
        <Route path="*" component={NotFound} />
      </Switch>
    </HashRouter>
  );
}

export default App;
