"use struct";

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import EventSelectView  from './views/EventSelect';
import CircleSelectView from './views/CircleSelect';

function App({ models }) {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route
          path="/" exact
          render={(router) => 
            <EventSelectView
              models={models}
              history={router.history}
              params={router.match.params}
            />}
        />
        <Route
          path="/:event/circle/:circleId?" exact
          render={(router) => 
            <CircleSelectView
              models={models}
              history={router.history}
              params={router.match.params}
            />}
        />
      </div>
    </Router>
  );
}

export default App;
