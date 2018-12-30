import React from 'react';
import { FacebookProvider } from 'react-facebook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleListPage from "./pages/ArticleListPage";
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export const App = () => (
  <FacebookProvider wait appId="133205694265094">
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/article/:id" component={ArticleListPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  </FacebookProvider>
);
