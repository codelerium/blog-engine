import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleListPage from "./pages/ArticleListPage";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/article/:id" component={ArticleListPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </Router>
);
