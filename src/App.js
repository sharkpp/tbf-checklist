"use struct";

import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import './App.css';
import EventSelectView  from './views/EventSelect';
import CircleSelectView from './views/CircleSelect';
import FavoriteImportView from './views/FavoriteImport';
import FavoriteListView from './views/FavoriteList';

function App({ models }) {
  return (
    <Router>
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
        path="/:event/circle/:circleId?/:productId?"
        render={(router) => 
          <CircleSelectView
            models={models}
            history={router.history}
            params={router.match.params}
          />}
      />
      <Route
        path="/fav/import"
        render={(router) => 
          <FavoriteImportView
            models={models}
            history={router.history}
          />}
      />
      <Route
        path="/fav/list"
        render={(router) => 
          <FavoriteListView
            models={models}
            history={router.history}
          />}
      />
    </Router>
  );
}

export default App;
