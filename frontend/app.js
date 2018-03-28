import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleListPage from "./components/ArticleListPage";
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/article/:id" component={ArticleListPage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  </Router>
);
