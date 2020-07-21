import React, { Fragment, useEffect } from 'react'
import { Link, HashRouter, Route, Switch } from 'react-router-dom'

import About from './About'
import Blog from './Blog'
import Resume from './Resume'

export default function Main() {
  useEffect(() => {
    let navbar = document.getElementById('navbarSupportedContent');
    let toggle = document.getElementById('js-nav-toggle');
    toggle.addEventListener('click', () => {
      navbar.classList.toggle('show');
    });

    let navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
      nav.addEventListener('click', () => {
        navbar.classList.toggle('show');
      })
    });
  }, []);

  return (
    <HashRouter basename="/">
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
          <Link className="navbar-brand js-scroll-trigger" to="/">
            <span className="d-block d-lg-none">Thaw Tran</span>
            <span className="d-none d-lg-block"><img className="img-fluid img-profile rounded-circle mx-auto mb-2" src="/profile.jpg" alt="" /></span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="js-nav-toggle"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link js-scroll-trigger">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/resume" className="nav-link js-scroll-trigger">Resume</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link js-scroll-trigger">Blog</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid p-0">
          <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/resume" component={Resume} />
          </Switch>
        </div>
      </Fragment>
    </HashRouter>
  )
}
